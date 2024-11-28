import nodemailer from 'nodemailer';
import fs, { readFileSync } from 'fs'
import path from 'path';
const emailTemplatePath = path.join(__dirname, '../../Comman/mail/premium_buy.html');

const template = fs.readFileSync(emailTemplatePath, 'utf-8')
export const MailServicePremium = (email: string, username: string, user_profile: string) => {
    let htmlcontent = template.replace('{username}', username)
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
        subject: "Thank For Youtube Clone Premium Buy",
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