const jwt = require('jsonwebtoken');
const becrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const Role = require('../models/role');
const UserRole = require('../models/user-role');
const UserType = require('../models/userType');
const helper = require('../_helpers/helper');
//================================= USER MIDDLEWARE ====================================

// Update User

exports.updateUser = (req, res, next) => {
    const { userId, firstName, lastName, email, zipCode } = req.body;
    // console.log('=================================',userId, firstName, lastName, email, zipCode);
    // const user = req.jwtOptions.user;
    return findById(userId).then(userFromDb => {
        if(!userFromDb) {
            return res.status(500).json({msg: 'we can not find user'});
        } else {
            userFromDb.firstName = firstName;
            userFromDb.lastName = lastName;
            userFromDb.email = email;
            // userFromDb.zipCode = zi;
            return userFromDb.save().then(result => {
                return res.status(200).json({msg: 'update successfull', result: result});
            }).catch(err => {
                console.log('ERROR updating ========================= ', err);
            });;
        }
    }).catch(err => {
        console.log('ERROR ========================= ', err);
    });
}

// Post Signup

exports.postSignup = (req, res, next) => {
    let { firstName, lastName, email, password, isAgreeTerms, zipCode} = req.body;

    if(password=== null || password === undefined ) {
        password = 'admin123';
    }
    if(firstName == null || firstName === undefined ) {
        firstName = 'abc';
        lastName = 'abc';
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    // console.log(firstName + ' ' + lastName + ' ' + email + ' ' + password);
    getUser({email: email}).then(user => {
        if(!user) {
            becrypt.hash(password, 12)
        .then( hashedPassword => {
            let userTypeId;
            return findAdminUserType().then(type => {
                userTypeId = type.id;
                const userObj = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                    isAgreeTerms: isAgreeTerms,
                    userTypeId: userTypeId,
                    isActive: true,
                    zipCode: zipCode
                });
                return userObj.save();
            });
        }).then(result => {
            if(firstName !== null || firstName !== undefined) {
                helper.sendEmail(email, 'Signup Successfull', `<h1> Wellcome ${firstName} ${lastName} to littlewins.`);
            }
            return res.status(201).json({ msg: 'successfulll signup.' });
        })
        } else {
            res.status(500).json('Email already exists... ' + email);
        }
    })
    .catch(err => {
        res.status(501).json('Error ' + err);
    });
}


// Post client 

exports.postClient = (req, res, next) => {
    let { firstName, lastName, email, password, isAgreeTerms, zipCode} = req.body;

    if(password=== null || password === undefined ) {
        password = 'admin123';
    }
    if(firstName == null || firstName === undefined ) {
        firstName = 'abc';
        lastName = 'abc';
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    // console.log(firstName + ' ' + lastName + ' ' + email + ' ' + password);
    getUser({email: email}).then(user => {
        if(!user) {
            becrypt.hash(password, 12)
        .then( hashedPassword => {
            let userTypeId;
            return findClientUserType().then(type => {
                userTypeId = type.id;
                const userObj = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                    isAgreeTerms: true,
                    userTypeId: userTypeId,
                    isActive: true,
                    zipCode: zipCode
                });
                return userObj.save();
            });
        }).then(result => {
            if(firstName !== null || firstName !== undefined) {
                helper.sendEmail(email, 'Signup Successfull', `<h1> Wellcome ${firstName} ${lastName} to littlewins.`);
            }
            return res.status(201).json({ msg: 'successfulll signup.' });
        })
        } else {
            res.status(500).json('Email already exists... ' + email);
        }
    })
    .catch(err => {
        res.status(501).json('Error ' + err);
    });
}


//Reset Password

exports.postResetPassword = (req, res, next) => {
    const { password, newPassword } = req.body;

    const user = req.jwtOptions.user;
    becrypt.compare(password, user.password).then(isEqual => {
        if(isEqual) {
            return becrypt.hash(newPassword, 12).then(hashedPassword => {
                user.password = hashedPassword;
                return user.save();
            }).then(result => {
                res.status(200).json({msg: 'password updated successfully'});
            });
        } else {
            return  res.status(401).json({msg: 'Please enter the correct password to update the new one'});
        }
    });

}


// Get All Users

exports.getAdminUsers = (req, res, next) => {
    getAllAdminUsers().then(users => {
        return res.status(200).json(users);
    });
};


// Get All Client Users

exports.getClientUsers = (req, res, next) => {
    getAllClientUsers().then(users => {
        return res.status(200).json(users);
    });
};

//Delete Admin User
exports.postDeleteAdminUser = (req, res, next) => {
    const { id } = req.body;
    getUser({id: id,isActive: true}).then(user => {
        if(user) {
            user.isActive = false;
            user.save().then(() => {
              res.status(200).json({msg: 'User deleted successfully'});  
            });
        } else {
            return res.status(500).json({msg: 'User not found.'});
        }
    });
}



// Get users count
exports.getUsersCount = (req, res, next) => {
    User.count({where: {isActive: true}}).then(response => {
        res.status(200).json({total: response, hasErrors: false});
    }).catch(error => {
        res.status(500).json({total: response ,error: error, hasErrors: true});
    })
}

//================================= END USER MIDDLEWARE ====================================


// ===================HELPER FUNCTION=========================

// User find by Id
const findById = async (id) => {
    return await User.findByPk(id);
}


// find user type Client

const findAdminUserType = async () => {
    return await UserType.findOne({where: {title: 'admin'}});
}

// Get one user
const getUser = async obj => {
    return await User.findOne({
    where: obj,
  });
};

// Get all ADMIN Users
const getAllAdminUsers = async () => {
    return await findAdminUserType().then(type => {
        return User.findAll({ attributes: ['id', 'email'], where: {isActive: true, userTypeId: type.id}});
    }) 
};

// Get all CLient Users
const getAllClientUsers = async () => {
    return await findClientUserType().then(type => {
        return User.findAll({where: {isActive: true, userTypeId: type.id}});
    }) 
};

// find user type Client

const findClientUserType = async () => {
    return await UserType.findOne({where: {title: 'client'}});
}

 