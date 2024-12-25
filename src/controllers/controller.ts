import { Request, Response } from 'express'
import { generateAndSendCsvSchema } from '../schemas/schemas.js'
import { LocationRecordModel } from '../models/locationRecordModel.js'
import { validateAndExecute } from '../utils/validateAndExecute.js'
import { getCsv/*, saveCSVInResources */ } from '../utils/csv.js'
import { sendEmail } from '../utils/sendMail.js'

const headers = [
  'fecha',
  'leader',
  'team',
  'latitude',
  'longitude',
  'hourOfRegistry',
  'internetStatusOnline'
]
const emailSubject = 'CSV de registro de ubicación de usuario'
const emailText = 'Adjunto el archivo CSV con los registros de ubicación de los usuarios.'
const emailFileName = 'user_location_registry.csv'

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
      req.query as Record<string, undefined>,
      generateAndSendCsvSchema,
      async (validatedData) => {
        const csvRowsData = await this.locationRecordModel.getAllInDate(validatedData.date)
        const csv = getCsv(headers, csvRowsData)

        const emailPayload = {
          emailToReceiveTheReport: validatedData.email,
          fileContent: csv,
          subject: emailSubject,
          text: emailText,
          fileName: emailFileName
        }

        await sendEmail(emailPayload)
      }
    )

    if (result.type === 'error') {
      res.status(400).send('Error al generar el reporte.')
      console.error(result.error)
    } else {
      res.status(200).send('Su reporte ha sido generado y enviado al email ingresado, porfavor, espere.')
    }
  }
}
