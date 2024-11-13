class FormDataCollector {
  constructor() {
    this.personalForm = {
      nome: document.getElementById('nome'),
      idade: document.getElementById('idade'),
      morada: document.getElementById('morada'),
      telefone: document.getElementById('telefone'),
      genero: document.getElementsByName('gender'),
      dataConsulta: document.getElementById('data_consulta')
    };

    this.marketingForm = {
      sms: document.getElementById('marketing_sms'),
      email: document.getElementById('marketing_email')
    };
    this.anamneseForm = {
      sintomas: {
        dor_cabeca: {
          check: document.getElementById('check_dor_cabeca'),
          obs: document.getElementById('obs_check_dor_cabeca')
        },
        ardor: {
          check: document.getElementById('check_ardor'),
          obs: document.getElementById('obs_check_ardor')
        },
        lacrimejo: {
          check: document.getElementById('check_lacrimejo'),
          obs: document.getElementById('obs_check_lacrimejo')
        },
        sensibilidade: {
          check: document.getElementById('check_sensibilidade'),
          obs: document.getElementById('obs_check_sensibilidade')
        },
        comichao: {
          check: document.getElementById('check_comichao'),
          obs: document.getElementById('obs_check_comichao')
        },
        olho_vermelho: {
          check: document.getElementById('check_olho_vermelho'),
          obs: document.getElementById('obs_check_olho_vermelho')
        },
        pupila_branca: {
          check: document.getElementById('check_pupila_branca'),
          obs: document.getElementById('obs_check_pupila_branca')
        },
        alteracoes_pestanas: {
          check: document.getElementById('check_pestanas'),
          obs: document.getElementById('obs_check_pestanas')
        },
        alteracoes_palpebras: {
          check: document.getElementById('check_palpebras'),
          obs: document.getElementById('obs_check_palpebras')
        },
        alteracoes_conjuntiva: {
          check: document.getElementById('check_conjuntiva'),
          obs: document.getElementById('obs_check_conjuntiva')
        }
      },
      dificuldadeVer: {
        radios: document.getElementsByName('dif_ver'),
        observacoes: document.getElementById('observacoes_dificuldade')
      },
      historico: {
        usa_oculo: document.getElementsByName('usa_oculo'),
        cirurgia_ocular: document.getElementsByName('cirurgia_ocular'),
        doencas_oculares: document.getElementsByName('doencas_oculares'),
        medicacao_ocular: document.getElementsByName('medicacao_ocular')
      },
      informacoesAdicionais: {
        doencas_diagnosticadas: document.getElementById('doencas_diagnosticadas'),
        medicacao_regular: document.getElementById('medicacao_regular'),
        qual_medicacao: document.getElementById('qual_medicacao'),
        antecedentes_familiares: document.getElementById('antecedentes_familiares')
      }
    }

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Personal data event listeners
    Object.keys(this.personalForm).forEach(key => {
      if (key !== 'genero') {
        this.personalForm[key].addEventListener('input', () => this.collectAllData());
      }
    });

    this.personalForm.genero.forEach(radio => {
      radio.addEventListener('change', () => this.collectAllData());
    });

    // Marketing preferences event listeners
    Object.keys(this.marketingForm).forEach(key => {
      this.marketingForm[key].addEventListener('input', () => this.collectAllData());
    });

    // Anamnese event listeners
    Object.values(this.anamneseForm.sintomas).forEach(key => {
      key.check?.addEventListener('change', () => this.collectAllData());
      key.obs?.addEventListener('input', () => this.collectAllData());
    });

    this.anamneseForm.dificuldadeVer.radios.forEach(radio => {
      radio.addEventListener('change', () => this.collectAllData());
    });
    this.anamneseForm.dificuldadeVer.observacoes?.addEventListener('input', () => this.collectAllData());

    Object.values(this.anamneseForm.historico).forEach(radioGroup => {
      Array.from(radioGroup).forEach(radio => {
        radio.addEventListener('change', () => this.collectAllData());
      });
    });

    Object.values(this.anamneseForm.informacoesAdicionais).forEach(input => {
      input?.addEventListener('input', () => this.collectAllData());
    });
  }

  getSelectedRadioValue(radioGroup) {
    const selectedRadio = Array.from(radioGroup).find(radio => radio.checked);
    return selectedRadio ? selectedRadio.value : null;
  }

  validatePersonalData(data) {
    const errors = [];

    if (!data.nome) errors.push('Nome é obrigatório');
    if (!data.idade) errors.push('Idade é obrigatória');
    if (!data.morada) errors.push('Morada é obrigatória');

    if (data.telefone && !/^[0-9+()\- ]*$/.test(data.telefone)) {
      errors.push('Formato de telefone inválido');
    }

    if (data.idade && (data.idade < 0 || data.idade > 120)) {
      errors.push('Idade inválida');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateMarketingData(data) {
    const errors = [];

    // Validate SMS format if provided
    if (data.sms && !/^[0-9+()\- ]*$/.test(data.sms)) {
      errors.push('Formato de SMS inválido');
    }

    // Validate email format if provided
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Formato de email inválido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateAnamneseData(data) {
    const errors = [];

    // Validate that at least one symptom is checked if there are observations
    Object.entries(data.sintomas).forEach(([key, symptom]) => {
      if (!symptom.checked && symptom.observacoes) {
        errors.push(`Observações presentes para ${key} sem sintoma selecionado`);
      }
    });

    // Validate that dificuldade_ver has a selection if there are observations
    if (!data.dificuldade_ver.opcao && data.dificuldade_ver.observacoes) {
      errors.push('Observações de dificuldade de ver presentes sem opção selecionada');
    }

    // Validate that all medical history questions are answered
    Object.entries(data.historico).forEach(([key, value]) => {
      if (!value) {
        errors.push(`Resposta obrigatória para ${key}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  collectPersonalData() {
    const data = {
      nome: this.personalForm.nome.value.trim(),
      idade: this.personalForm.idade.value,
      morada: this.personalForm.morada.value.trim(),
      telefone: this.personalForm.telefone.value.trim(),
      genero: this.getSelectedRadioValue(this.personalForm.genero),
      dataConsulta: this.personalForm.dataConsulta.value
    };

    const validation = this.validatePersonalData(data);

    return {
      data,
      validation
    };
  }

  collectMarketingData() {
    const data = {
      sms: this.marketingForm.sms.value.trim(),
      email: this.marketingForm.email.value.trim()
    };

    const validation = this.validateMarketingData(data);

    return {
      data,
      validation
    };
  }

  collectAnamneseData() {
    const data = {};

    const symptomsData = {};
    Object.entries(this.anamneseForm.sintomas).forEach(([key, symptom]) => {
      symptomsData[key] = {
        checked: symptom.check?.checked || false,
        observacoes: symptom.obs?.value.trim() || ''
      };
    });

    data["sintomas"] = symptomsData;

    data["dificuldade_ver"] = {
      opcao: this.getSelectedRadioValue(this.anamneseForm.dificuldadeVer.radios),
      observacoes: this.anamneseForm.dificuldadeVer.observacoes?.value.trim() || ''
    }

    const historicoData = {};
    Object.entries(this.anamneseForm.historico).forEach(([key, radioGroup]) => {
      historicoData[key] = this.getSelectedRadioValue(radioGroup);
    });

    data["historico"] = historicoData;

    const infoData = {};
    Object.entries(this.anamneseForm.informacoesAdicionais).forEach(([key, input]) => {
      infoData[key] = input?.value.trim() || '';
    });

    data["infoData"] = infoData;

    const validation = this.validateAnamneseData(data);

    return {
      data,
      validation
    };
  }

  collectAllData() {
    const personalData = this.collectPersonalData();
    const marketingData = this.collectMarketingData();
    const anamneseData = this.collectAnamneseData();

    console.log(anamneseData)

    const allData = {
      personal: personalData.data,
      marketing: marketingData.data,
      anamnese: anamneseData.data
    };

    const isValid = personalData.validation.isValid && marketingData.validation.isValid;
    const errors = [...personalData.validation.errors, ...marketingData.validation.errors];

    return {
      data: allData,
      validation: {
        isValid,
        errors
      }
    };
  }

  storeData() {
    const { data, validation } = this.collectAllData();

    if (validation.isValid) {
      localStorage.setItem('formData', JSON.stringify(data));
      console.log('All data stored successfully:', data);
      return true;
    } else {
      console.log('Cannot store invalid data:', validation.errors);
      return false;
    }
  }

  retrieveData() {
    const storedData = localStorage.getItem('formData');
    return storedData ? JSON.parse(storedData) : null;
  }

  populateForm(data = this.retrieveData()) {
    if (!data) return;

    // Populate personal data
    if (data.personal) {
      Object.keys(this.personalForm).forEach(key => {
        if (key === 'genero') {
          this.personalForm.genero.forEach(radio => {
            radio.checked = radio.value === data.personal[key];
          });
        } else if (this.personalForm[key]) {
          this.personalForm[key].value = data.personal[key] || '';
        }
      });
    }

    // Populate marketing data
    if (data.marketing) {
      Object.keys(this.marketingForm).forEach(key => {
        if (this.marketingForm[key]) {
          this.marketingForm[key].value = data.marketing[key] || '';
        }
      });
    }

    // Populate anamnese data
    if (data.anamnese) {
      // Populate symptoms
      Object.entries(this.anamneseForm.sintomas).forEach(([key, value]) => {
        if (this.symptoms[key]) {
          this.symptoms[key].check.checked = value.checked;
          this.symptoms[key].obs.value = value.observacoes || '';
        }
      });

      // Populate vision difficulty
      this.anamneseForm.dificuldadeVer.radios.forEach(radio => {
        radio.checked = radio.value === data.dificuldade_ver.opcao;
      });

      if (this.anamneseForm.dificuldadeVer.observacoes) {
        this.dificuldadeVer.observacoes.value = data.dificuldade_ver.observacoes || '';
      }

      // Populate medical history
      Object.entries(data.anamnese.historico).forEach(([key, value]) => {
        if (this.anamnese.historico[key]) {
          Array.from(this.anamnese.historico[key]).forEach(radio => {
            radio.checked = radio.value === value;
          });
        }
      });

      // Populate additional information
      Object.entries(data.anamnese.informacoes_adicionais).forEach(([key, value]) => {
        if (this.anamnese.informacoesAdicionais[key]) {
          this.anamnese.informacoesAdicionais[key].value = value || '';
        }
      });
    }
  }

  // Helper method to display validation errors (can be customized)
  displayErrors(errors) {
    if (errors.length > 0) {
      console.log('Validation Errors:', errors);
      // You can implement custom error display logic here
      // For example, showing errors in specific elements or using a toast notification
    }
  }
}

// Usage example:
const formCollector = new FormDataCollector();

// Example of form submission handling
document.querySelector('form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const { data, validation } = formCollector.collectAllData();

  if (validation.isValid) {
    formCollector.storeData();
    console.log('Form submitted successfully', data);
  } else {
    formCollector.displayErrors(validation.errors);
  }
});

// Example of retrieving and populating stored data
// const storedData = formCollector.retrieveData();
// formCollector.populateForm(storedData);