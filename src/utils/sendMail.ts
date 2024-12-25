import { createTransport } from 'nodemailer'
import { encondingType } from './constants.js'

interface EmailPayload {
  emailToReceiveTheReport: string
  fileContent: string
  subject: string
  text: string
  fileName: string
}

const serviceType = 'gmail'

export async function sendEmail (payload: EmailPayload): Promise<void> {
  const transporter = createTransport({
    service: serviceType,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: payload.emailToReceiveTheReport,
    subject: payload.subject,
    text: payload.text,
    attachments: [
      {
        filename: payload.fileName,
        content: payload.fileContent,
        encoding: encondingType
      }
    ]
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Correo enviado:', info.response)
  } catch (error) {
    console.error('Error al enviar el correo:', error)
  }
}
