// import nodemailer from 'nodemailer';
// import config from '../config/config';
const nodemailer = require('nodemailer');
const config = require('../config/config');



class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport(config.mailSenderProxy);
    }

    send = (fromEmail, toEmail, subject, content, callback) => {
        return new Promise(async(resolve, reject) => {
            let mail = {
                from: fromEmail,
                to: toEmail,
                subject: subject,
                text: content
            };

            let sendResult = await this.transporter.sendMail(mail, (err, info) => {
                if (!err && info) {
                    console.info('邮件发送成功', info.accepted, info.response)
                    resolve(true);
                    return;
                }

                console.error(err);
                console.warn(info);
                console.warn('邮件发送失败');
                reject(false);
            });

        });
    };


}



// export default Mail;
module.exports = new Mail();