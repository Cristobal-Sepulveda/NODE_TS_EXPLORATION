import { createTransport } from 'nodemailer'
import { encondingType } from './constants.js'

const serviceType = 'gmail'

export async function sendEmail (
  emailToReceiveTheReport: string,
  fileContent: string,
  emailSubject: string,
  emailText: string,
  emailFileName: string
): Promise<void> {
  const transporter = createTransport({
    service: serviceType,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailToReceiveTheReport,
    subject: emailSubject,
    text: emailText,
    attachments: [
      {
        filename: emailFileName,
        content: fileContent,
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
