import { writeFileSync } from 'node:fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
export function getCsv(headers, csvRowsData) {
    const rows = [headers, ...csvRowsData];
    return rows.map((row) => row.map((value) => `"${value}"`).join(';')).join('\n');
}
export function saveCSVInResources(csvContent) {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(_filename);
    const filePath = join(_dirname, 'reporte.csv');
    writeFileSync(filePath, csvContent, 'utf8');
}
