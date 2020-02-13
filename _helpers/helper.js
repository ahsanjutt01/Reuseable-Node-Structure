const nodemailer = require('nodemailer');
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(sendGridTransport({
    auth : {
        api_key: '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'
    }
}));

exports.sendEmail = (to, subject, html) => {
    transporter.sendMail({
        to: to,
        from: 'ahsan@littlewins.com',
        subject: subject,
        html: html
    }).catch(err => console.log('Mail Error', err));
    return true;
}



