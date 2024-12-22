// import { createTransport } from 'nodemailer'
import { Request, Response } from 'express'
// import { writeFileSync } from 'node:fs'
// import { join, dirname } from 'path'
// import { fileURLToPath } from 'url'
import { validateQuerySchema, generateAndSendCsvSchema } from './schemas.js'
import { execute } from '../utils/execute.js'
import { LocationRecordModel } from '../models/locationRecordModel.js'
export class Controller {
  locationRecordModel: LocationRecordModel

  constructor (
    locationRecordModel: LocationRecordModel
  ) { 
    this.locationRecordModel = locationRecordModel 
  }

  async generateAndSendCsv (req: Request, res: Response) {
    const csvRows: string[][] = []
      const result = await execute( 
        async () => { return validateQuerySchema(req.query, generateAndSendCsvSchema)},
        async () => { await this.locationRecordModel.getAllInDate(date, csvRows) }
      )
      if('error' in result) return res.status(500).send(`ServerError: ${result.error}`) 
      console.log()
      //const date = req.query.date as string

      //const csv = this.#getCsv(result.datacsvRowsData)
      //this.#saveCSVInResources(csv)
      // await sendEmail(email, csv)
      return res.status(200).send('Su reporte ha sido generado y enviado al email ingresado, porfavor, espere.')
    }

  // #getCsv (csvRowsData: string[][]) {
  //   const header = ['fecha', 'leader', 'team', 'latitude', 'longitude', 'hourOfRegistry', 'internetStatusOnline']
  //   const rows = [header, ...csvRowsData]
  //   return rows.map((row) => row.map((value) => `"${value}"`).join(';')).join('\n')
  // }

  // #saveCSVInResources (csvContent: string) {
  //   const __filename = fileURLToPath(import.meta.url)
  //   const __dirname = dirname(__filename)
  //   const filePath = join(__dirname, 'reporte.csv')
  //   writeFileSync(filePath, csvContent, 'utf8')
  // }
}

// async function sendEmail (emailToReceiveTheReport, fileContent) {
//   const transporter = createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'sepulveda.cristobal.ignacio@gmail.com',
//       pass: 'mpvy bbzi woaz ykhp'
//     }
//   })

//   const mailOptions = {
//     from: 'sepulveda.cristobal.ignacio@gmail.com',
//     to: emailToReceiveTheReport,
//     subject: 'CSV de registro de ubicación de usuario',
//     text: 'Adjunto el archivo CSV con los registros de ubicación de los usuarios.',
//     attachments: [
//       {
//         filename: 'user_location_registry.csv',
//         content: fileContent,
//         encoding: 'utf-8'
//       }
//     ]
//   }

//   return new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log('Error al enviar el correo:', error)
//         reject(error)
//       } else {
//         console.log('Correo enviado:', info.response)
//         resolve(info)
//       }
//     })
//   })
// }
