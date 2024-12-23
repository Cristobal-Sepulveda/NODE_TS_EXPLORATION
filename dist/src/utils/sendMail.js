import { createTransport } from 'nodemailer';
// const subject = 'CSV de registro de ubicación de usuario'
// const text = 'Adjunto el archivo CSV con los registros de ubicación de los usuarios.'
// const fileName = 'user_location_registry.csv'
const encondingType = 'utf-8';
const serviceType = 'gmail';
export async function sendEmail(emailToReceiveTheReport, fileContent, emailSubject, emailText, emailFileName) {
    const transporter = createTransport({
        service: serviceType,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
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
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
    }
    catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}
