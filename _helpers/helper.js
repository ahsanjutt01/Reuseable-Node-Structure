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

// Authorization Is Admin

exports.isAdmin = (req, res, next) => {

    const user = req.jwtOptions.user;
    // console.log(user);
    // return res.status(401).json({msg: 'you are not admin user', user});

    if(user.userType.title.toLowerCase() === 'admin') {
        next();
    }
    else {
        return res.status(401).json({msg: 'You are not an admin user'});
    }
}

// Authorization Is Client

exports.isClient = (req, res, next) => {

    const user = req.jwtOptions.user;
    if(user.userType.title.toLowerCase() === 'client') {
        next();
    }
    else {
        return res.status(401).json({msg: 'User not found'});
    }
}

