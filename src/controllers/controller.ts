import { Request, Response } from 'express'
import { generateAndSendCsvSchema } from './schemas.js'
import { LocationRecordModel } from '../models/locationRecordModel.js'
import { validateAndExecute } from '../utils/execute.js'
import { Result } from '../utils/result.js'
import { getCsv, saveCSVInResources } from 'src/utils/csv.js'

export class Controller {
  locationRecordModel: LocationRecordModel

  constructor (
    locationRecordModel: LocationRecordModel
  ) {
    this.locationRecordModel = locationRecordModel
  }

  async generateAndSendCsv (
    req: Request,
    res: Response
  ): Promise<void> {
    const result = await validateAndExecute(
      req.query as Record<string, string | undefined>,
      generateAndSendCsvSchema,
      async (validatedData) => {
        const csvRows: string[][] = []
        const { date /* , email */ } = validatedData
        const csvRowsData = await this.locationRecordModel.getAllInDate(date, csvRows)
        const csv = getCsv(csvRowsData)
        saveCSVInResources(csv)
      }
    )

    if (result === Result.success) {
      res.status(200).send('Su reporte ha sido generado y enviado al email ingresado, porfavor, espere.')
    } else {
      res.status(400).send('Error al generar el reporte.')
    }
  }
}
