const Subscribe = require('../models/subscribe');

const { Op } = require("sequelize");
const sequelize = require("sequelize");
//================================= SUBSCRIBE MIDDLEWARE ====================================

// post subscribe method
exports.postSubscribe = (req, res, next) => {
    const {email, isActive} = req.body;
    const subObj = new Subscribe({
        email: email,
        isActive: true
    });
    subObj.save().then(response => {
        return res.status(200).json({message: "subscription added successfully", hasErrors: false});
    }).catch(error => {
        return res.status(500).json({message: "subscription failed", hasErrors: true});
    })
}
//get all subscribers

exports.getAllSubscribers = (req, res, next) => {
    Subscribe.findAll({where: {isActive: true}}).then(response => {
        return res.status(200).json({subscribers: response, message: "fetched successfully", hasErrors: false});
    }).catch(error => {
       return res.status(200).json({subscribers: response, message: "fetching failed", hasErrors: false});
    })
}