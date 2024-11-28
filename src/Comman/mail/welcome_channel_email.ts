import nodemailer from 'nodemailer';
import fs, { readFileSync } from 'fs'
import path from 'path';
const emailTemplatePath = path.join(__dirname, '../../Comman/mail/welcome_channel_email.html');

const template = fs.readFileSync(emailTemplatePath, 'utf-8')
export const MailService = (email: string, channel_name: string, user_profile: string) => {
    let htmlcontent = template.replace('{channel_name}', channel_name)
    htmlcontent = htmlcontent.replace('{channel_name}', channel_name)
    // htmlcontent = htmlcontent.replace('{channel_link',link)
    htmlcontent = htmlcontent.replace('{year}', new Date().getFullYear().toString())
    htmlcontent = htmlcontent.replace('{user_profile}', 'cid:unique-image-id')

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome To Youtube",
        html: htmlcontent,
        attachments: [{
            filename: user_profile,
            path: user_profile,
            cid: 'unique-image-id'
        }]
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(info);
        }

    });
}