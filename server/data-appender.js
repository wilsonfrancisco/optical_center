import path from 'path';
import ExcelJS from 'exceljs';

// Caminho do arquivo Excel e do JSON
const excelFilePath = path.join(process.cwd(), 'data', 'map.xlsx');
 
const data = {
    "personal": {
        "nome": "Eliane Helena Francisco Gaspar",
        "idade": "21",
        "morada": "Hoji ya henda",
        "telefone": "935592470",
        "genero": null,
        "dataConsulta": "2025-02-01"
    },
    "marketing": {
        "sms": "935652147",
        "email": "gaspareliane47@gmail.com"
    },
    "anamnese": {
        "sintomas": {
            "dor_cabeca": {
                "checked": true,
                "observacoes": "dores de cabeça"
            },
            "ardor": {
                "checked": true,
                "observacoes": "ardor"
            },
            "lacrimejo": {
                "checked": true,
                "observacoes": "lacrimejo"
            },
            "sensibilidade": {
                "checked": true,
                "observacoes": "sensibilidade"
            },
            "comichao": {
                "checked": true,
                "observacoes": "comichão"
            },
            "olho_vermelho": {
                "checked": true,
                "observacoes": "olho vermelho"
            },
            "pupila_branca": {
                "checked": true,
                "observacoes": "pupila branca"
            },
            "alteracoes_pestanas": {
                "checked": true,
                "observacoes": "alterações pestanas"
            },
            "alteracoes_palpebras": {
                "checked": true,
                "observacoes": "alterações palpebras"
            },
            "alteracoes_conjuntiva": {
                "checked": true,
                "observacoes": "alterações conjuntiva"
            }
        },
        "dificuldade_ver": {
            "opcao": "perto",
            "observacoes": ""
        },
        "historico": {
            "usa_oculo": "sim",
            "cirurgia_ocular": "sim",
            "doencas_oculares": "sim",
            "medicacao_ocular": "sim"
        },
        "infoData": {
            "doencas_diagnosticadas": "doenças diagnosticadas",
            "medicacao_regular": "medição regular",
            "qual_medicacao": "fotogray",
            "antecedentes_familiares": "Pai, mãe e irmãos"
        }
    },
    "exames": {
        "medidas": {
            "ar": {
                "od": "1.2",
                "oe": "1.6",
                "binocular": "1.3"
            },
            "tonometria": {
                "od": "3.4",
                "oe": "1.23",
                "binocular": "1.8"
            },
            "avLonge": {
                "od": "1.1",
                "oe": "13",
                "binocular": "1.7"
            },
            "avPerto": {
                "od": "1",
                "oe": "12",
                "binocular": "10"
            }
        },
        "testes": {
            "ishihara": {
                "resultado": "alterado",
                "observacoes": "Ishi"
            },
            "motilidadeOcular": {
                "resultado": "nao_alterado",
                "observacoes": "mot"
            },
            "estereopsia": {
                "resultado": "alterado",
                "observacoes": "mosca"
            }
        },
        "prisma": "endoforia"
    },
    "queixaAuditiva": {
        "dor": {
            "checked": true,
            "observacoes": ""
        },
        "zumbidos": {
            "checked": true,
            "observacoes": ""
        },
        "otites": {
            "checked": true,
            "observacoes": ""
        },
        "coceira": {
            "checked": true,
            "observacoes": ""
        },
        "plenitude": {
            "checked": true,
            "observacoes": ""
        },
        "outros": {
            "checked": true,
            "observacoes": "outros"
        }
    },
    "achadosOtologicos": {
        "od_normal": true,
        "oe_normal": false,
        "od_perfuracao": false,
        "oe_perfuracao": true,
        "od_obstrucao": true,
        "oe_obstrucao": false,
        "od_deteccao": true,
        "oe_deteccao": false,
        "od_sinais_otite": false,
        "oe_sinais_otite": true,
        "od_hiperema": true,
        "oe_hiperema": false
    },
    "encaminhamentos": {
        "consulta_audiologia": true,
        "consulta_otorrino": true,
        "orientacoes": true
    },
    "examiner": {
        "examinador": "Wilson Francisco",
        "dataExame": "2025-02-01"
    }
}

// Função para adicionar dados no Excel
export async function appendDataToExcel() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);
    const worksheet = workbook.worksheets[0]; // Considerando a primeira aba

    console.log('Worksheet:', worksheet.getRow(7).getCell(2).value);
    
    const STARTING_POINT_ROW = 7;
    const row = worksheet.getRow(STARTING_POINT_ROW);

    // Mapeando e inserindo os dados no Excel
    // Dados pessoais
    row.getCell(2).value = data.personal.nome;
    row.getCell(4).value = data.personal.idade.toString();
    row.getCell(3).value = data.personal.telefone.toString();
    row.getCell(14).value = data.personal.dataConsulta;
    
    // // Exemplo de como mapear os sintomas
    // let colIndex = 6; // Ajuste conforme o layout da planilha
    // for (const [key, value] of Object.entries(data.anamnese.sintomas)) {
    //     row.getCell(colIndex).value = value.checked ? 'Sim' : 'Não';
    //     colIndex++;
    // }
    
    row.commit(); // Salvar linha no buffer

    await workbook.xlsx.writeFile(excelFilePath);
    // console.log(`Dados adicionados na linha ${rowNum}!`);
}

appendDataToExcel().catch(console.error);
