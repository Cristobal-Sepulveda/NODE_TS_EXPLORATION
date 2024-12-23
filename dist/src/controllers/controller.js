var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { generateAndSendCsvSchema } from './schemas.js';
import { validateAndExecute } from '../utils/execute.js';
import { Result } from '../utils/result.js';
export class Controller {
    constructor(locationRecordModel) {
        this.locationRecordModel = locationRecordModel;
    }
    generateAndSendCsv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield validateAndExecute(req.query, generateAndSendCsvSchema, (validatedData) => __awaiter(this, void 0, void 0, function* () {
                const csvRows = [];
                const { date /* , email */ } = validatedData;
                const csvRowsData = yield this.locationRecordModel.getAllInDate(date, csvRows);
                const csv = this.getCsv(csvRowsData);
                this.saveCSVInResources(csv);
            }));
            console.log(result);
            if (result === Result.success) {
                res.status(200).send('Su reporte ha sido generado y enviado al email ingresado, porfavor, espere.');
            }
            else {
                res.status(400).send('Error al generar el reporte.');
            }
        });
    }
    getCsv(csvRowsData) {
        const header = ['fecha', 'leader', 'team', 'latitude', 'longitude', 'hourOfRegistry', 'internetStatusOnline'];
        const rows = [header, ...csvRowsData];
        return rows.map((row) => row.map((value) => `"${value}"`).join(';')).join('\n');
    }
    saveCSVInResources(csvContent) {
        const _filename = fileURLToPath(import.meta.url);
        const _dirname = dirname(_filename);
        const filePath = join(_dirname, 'reporte.csv');
        writeFileSync(filePath, csvContent, 'utf8');
    }
}
