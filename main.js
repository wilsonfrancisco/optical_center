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
    };

    this.examesForm = {
      ar: {
        od: document.getElementById('ar_od'),
        oe: document.getElementById('ar_oe'),
        binocular: document.getElementById('ar_binocular')
      },
      tonometria: {
        od: document.getElementById('tonometria_od'),
        oe: document.getElementById('tonometria_oe'),
        binocular: document.getElementById('tonometria_binocular')
      },
      avLonge: {
        od: document.getElementById('av_longe_od'),
        oe: document.getElementById('av_longe_oe'),
        binocular: document.getElementById('av_longe_binocular')
      },
      avPerto: {
        od: document.getElementById('av_perto_od'),
        oe: document.getElementById('av_perto_oe'),
        binocular: document.getElementById('av_perto_binocular')
      },
      testeIshihara: {
        radios: document.getElementsByName('teste_ishihara'),
        obs: document.getElementById('teste_ishihara_obs')
      },
      motilidadeOcular: {
        radios: document.getElementsByName('motilidade_ocular'),
        obs: document.getElementById('motilidade_ocular_obs')
      },
      testeEstereopsia: {
        radios: document.getElementsByName('teste_estereopsia'),
        obs: document.getElementById('teste_estereopsia_obs')
      },
      prisma: document.getElementsByName('prisma')
    };

    this.examinerForm = {
      examinador: document.getElementById('examinador'),
      dataExame: document.getElementById('data_exame')
    };

    this.queixaAuditivaForm = {
      dor: {
        check: document.getElementById('check_dor'),
        obs: null // Sem observações para este campo
      },
      zumbidos: {
        check: document.getElementById('check_zumbidos'),
        obs: null
      },
      otites: {
        check: document.getElementById('check_otites'),
        obs: null
      },
      coceira: {
        check: document.getElementById('check_coceira'),
        obs: null
      },
      plenitude: {
        check: document.getElementById('check_plenitude'),
        obs: null
      },
      outros: {
        check: document.getElementById('check_outros'),
        obs: document.getElementById('obs_check_outros')
      }
    };

    this.achadosOtologicosForm = {
      od_normal: document.getElementById('check_od_normal'),
      oe_normal: document.getElementById('check_oe_normal'),
      od_perfuracao: document.getElementById('check_od_perfuracao'),
      oe_perfuracao: document.getElementById('check_oe_perfuracao'),
      od_obstrucao: document.getElementById('check_od_obstrucao'),
      oe_obstrucao: document.getElementById('check_oe_obstrucao'),
      od_deteccao: document.getElementById('check_od_deteccao'),
      oe_deteccao: document.getElementById('check_oe_deteccao'),
      od_sinais_otite: document.getElementById('check_od_sinais_otite'),
      oe_sinais_otite: document.getElementById('check_oe_sinais_otite'),
      od_hiperema: document.getElementById('check_od_hiperema'),
      oe_hiperema: document.getElementById('check_oe_hiperema')
    };

    this.encaminhamentosForm = {
      consulta_audiologia: document.getElementById('check_consulta_audiologia'),
      consulta_otorrino: document.getElementById('check_consulta_otorrino'),
      orientacoes: document.getElementById('check_orientacoes')
    };

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

    // Exames measurements event listeners
    Object.values(this.examesForm).forEach(category => {
      if (category.od) {  // If it has od/oe/binocular structure
        Object.values(category).forEach(input => {
          input?.addEventListener('input', () => this.collectAllData());
        });
      }
    });

    // Radio button groups with observations
    ['testeIshihara', 'motilidadeOcular', 'testeEstereopsia'].forEach(test => {
      this.examesForm[test].radios.forEach(radio => {
        radio.addEventListener('change', () => this.collectAllData());
      });
      this.examesForm[test].obs?.addEventListener('input', () => this.collectAllData());
    });

    // Prisma radio buttons
    this.examesForm.prisma.forEach(radio => {
      radio.addEventListener('change', () => this.collectAllData());
    });

    // Event listeners para QUEIXA AUDITIVA
    Object.values(this.queixaAuditivaForm).forEach(field => {
      if (field.check) {
        field.check.addEventListener('change', () => this.collectAllData());
      }
      if (field.obs) {
        field.obs.addEventListener('input', () => this.collectAllData());
      }
    });

    // Event listeners para ACHADOS OTOLÓGICOS
    Object.values(this.achadosOtologicosForm).forEach(checkbox => {
      checkbox.addEventListener('change', () => this.collectAllData());
    });

    // Event listeners para ENCAMINHAMENTOS
    Object.values(this.encaminhamentosForm).forEach(checkbox => {
      checkbox.addEventListener('change', () => this.collectAllData());
    });

    // Examiner information event listeners
    Object.values(this.examinerForm).forEach(input => {
      input.addEventListener('input', () => this.collectAllData());
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

  collectQueixaAuditivaData() {
    const data = {};
    Object.entries(this.queixaAuditivaForm).forEach(([key, field]) => {
      data[key] = {
        checked: field.check?.checked || false,
        observacoes: field.obs?.value.trim() || ''
      };
    });
    return data;
  }

  collectAchadosOtologicosData() {
    const data = {};
    Object.entries(this.achadosOtologicosForm).forEach(([key, checkbox]) => {
      data[key] = checkbox.checked;
    });
    return data;
  }

  collectEncaminhamentosData() {
    const data = {};
    Object.entries(this.encaminhamentosForm).forEach(([key, checkbox]) => {
      data[key] = checkbox.checked;
    });
    return data;
  }

  collectExamesData() {
    const data = {
      medidas: {
        ar: {
          od: this.examesForm.ar.od.value.trim(),
          oe: this.examesForm.ar.oe.value.trim(),
          binocular: this.examesForm.ar.binocular.value.trim()
        },
        tonometria: {
          od: this.examesForm.tonometria.od.value.trim(),
          oe: this.examesForm.tonometria.oe.value.trim(),
          binocular: this.examesForm.tonometria.binocular.value.trim()
        },
        avLonge: {
          od: this.examesForm.avLonge.od.value.trim(),
          oe: this.examesForm.avLonge.oe.value.trim(),
          binocular: this.examesForm.avLonge.binocular.value.trim()
        },
        avPerto: {
          od: this.examesForm.avPerto.od.value.trim(),
          oe: this.examesForm.avPerto.oe.value.trim(),
          binocular: this.examesForm.avPerto.binocular.value.trim()
        }
      },
      testes: {
        ishihara: {
          resultado: this.getSelectedRadioValue(this.examesForm.testeIshihara.radios),
          observacoes: this.examesForm.testeIshihara.obs.value.trim()
        },
        motilidadeOcular: {
          resultado: this.getSelectedRadioValue(this.examesForm.motilidadeOcular.radios),
          observacoes: this.examesForm.motilidadeOcular.obs.value.trim()
        },
        estereopsia: {
          resultado: this.getSelectedRadioValue(this.examesForm.testeEstereopsia.radios),
          observacoes: this.examesForm.testeEstereopsia.obs.value.trim()
        }
      },
      prisma: this.getSelectedRadioValue(this.examesForm.prisma)
    };
  
    return {
      data,
      validation: { isValid: true, errors: [] } // Add validation rules if needed
    };
  }

  collectExaminerData() {
    const data = {
      examinador: this.examinerForm.examinador.value.trim(),
      dataExame: this.examinerForm.dataExame.value
    };
  
    const errors = [];
    if (!data.examinador) errors.push('Nome do examinador é obrigatório');
    if (!data.dataExame) errors.push('Data do exame é obrigatória');
  
    return {
      data,
      validation: {
        isValid: errors.length === 0,
        errors
      }
    };
  }

  collectAllData() {
    const personalData = this.collectPersonalData();
    const marketingData = this.collectMarketingData();
    const anamneseData = this.collectAnamneseData();
    const examesData = this.collectExamesData();
    const queixaAuditivaData = this.collectQueixaAuditivaData();
    const achadosOtologicosData = this.collectAchadosOtologicosData();
    const encaminhamentosData = this.collectEncaminhamentosData();
    const examinerData = this.collectExaminerData();

    console.log(anamneseData)

    const allData = {
      personal: personalData.data,
      marketing: marketingData.data,
      anamnese: anamneseData.data,
      exames: examesData.data,
      queixaAuditiva: queixaAuditivaData,
      achadosOtologicos: achadosOtologicosData,
      encaminhamentos: encaminhamentosData,
      examiner: examinerData.data
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

      // Preencher QUEIXA AUDITIVA
      if (data.queixaAuditiva) {
        Object.entries(this.queixaAuditivaForm).forEach(([key, field]) => {
          if (field.check) {
            field.check.checked = data.queixaAuditiva[key].checked;
          }
          if (field.obs) {
            field.obs.value = data.queixaAuditiva[key].observacoes;
          }
        });
      }

      // Preencher ACHADOS OTOLÓGICOS
      if (data.achadosOtologicos) {
        Object.entries(this.achadosOtologicosForm).forEach(([key, checkbox]) => {
          checkbox.checked = data.achadosOtologicos[key];
        });
      }

      // Preencher ENCAMINHAMENTOS
      if (data.encaminhamentos) {
        Object.entries(this.encaminhamentosForm).forEach(([key, checkbox]) => {
          checkbox.checked = data.encaminhamentos[key];
        });
      }
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