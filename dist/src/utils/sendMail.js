var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createTransport } from 'nodemailer';
// const subject = 'CSV de registro de ubicación de usuario'
// const text = 'Adjunto el archivo CSV con los registros de ubicación de los usuarios.'
// const fileName = 'user_location_registry.csv'
const encondingType = 'utf-8';
const serviceType = 'gmail';
export function sendEmail(emailToReceiveTheReport, fileContent, emailSubject, emailText, emailFileName) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const info = yield transporter.sendMail(mailOptions);
            console.log('Correo enviado:', info.response);
        }
        catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    });
}
