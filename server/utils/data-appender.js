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

    row.getCell(2).value = data.personal.nome;
    row.getCell(4).value = data.personal.idade.toString();
    row.getCell(3).value = data.personal.telefone.toString();
    row.getCell(14).value = data.personal.dataConsulta;

    if (data.anamnese.sintomas.ardor.checked) {
        row.getCell(15).value = "Ardor/Dor ocular";
    }

    if (data.anamnese.sintomas.sensibilidade.checked) {
        row.getCell(16).value = "Sensibilidade à luz";
    }

    if (data.anamnese.sintomas.comichao.checked) {
        row.getCell(17).value = "Comichão";
    }

    row.getCell(5).value = data.exames.medidas.tonometria.od;
    row.getCell(6).value = data.exames.medidas.tonometria.oe;

    const decimal = "|10"

    row.getCell(7).value = data.exames.medidas.avLonge.od ? `${data.exames.medidas.avLonge.od}${decimal}` : "";
    row.getCell(8).value = data.exames.medidas.avLonge.oe ? `${data.exames.medidas.avLonge.oe}${decimal}` : "";
    row.getCell(9).value = data.exames.medidas.avLonge.binocular ? `${data.exames.medidas.avLonge.binocular}${decimal}` : "";

    row.getCell(10).value = data.exames.medidas.avPerto.binocular ? `${data.exames.medidas.avPerto.binocular}${decimal}` : "";

    if (data.anamnese.historico.usa_oculo) {
        row.getCell(18).value = "RX";
    }

    row.commit();

    await workbook.xlsx.writeFile(excelFilePath);

    await updateLastInsertedRow(STARTING_POINT_ROW);
}
