import path from 'path';
import ExcelJS from 'exceljs';

import { 
    getLastInsertedRow,
    updateLastInsertedRow
} from '../providers/db.js';

const excelFilePath = path.join(process.cwd(), 'data', 'map.xlsx');
 
export async function appendDataToExcel(data) {
    const lastInsertedRow = await getLastInsertedRow();
    const STARTING_POINT_ROW = lastInsertedRow + 1;
    
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);
    const worksheet = workbook.worksheets[0]; 

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
    
    await updateLastInsertedRow(STARTING_POINT_ROW);
}
