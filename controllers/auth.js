const jwt = require('jsonwebtoken');
const becrypt = require('bcryptjs');
const Sequelize = require('sequelize');

const User = require('../models/user');
const Role = require('../models/role');
const UserRole = require('../models/user-role');
const UserType = require('../models/userType');
const Catagory = require('../models/catagory');

"use strict"


//Post Login
exports.postLogin = (req, res, next) => {

    const { email, password } = req.body;
    // console.log(email + ' ' + password);
    if (email && password) {
        let loadedUser;
        getUser({email: email})
        .then(user => {
            if(!user) {
                return res.status(401).json({msg: 'Please signup first then login'});
            }
            loadedUser = user;
            return becrypt.compare(password, user.password);
        }).then(isEqual => {
            if (isEqual) {
                let payload = { id: loadedUser.id };
                let token = jwt.sign(payload, req.jwtOptions.secretOrKey);

                // res.cookie('jwt', token);
                return res.status(200).json({msg: 'Successfull login', jwt: token});
            }
            else {
                return res.status(401).json({msg: 'Email or password is invalid'});
            }
        }).catch(err => console.log(err));
    } else {
        console.log('else runn');
        return res.status(401).json({msg: 'Email or password is invalid'});
    }
}

// Post Signup
exports.postSignup = (req, res, next) => {
    const { firstName, lastName, email, password, isAgreeTerms, zipCode} = req.body;
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
                    isAgreeTerms: isAgreeTerms,
                    userTypeId: userTypeId,
                    isActive: true,
                    zipcode: zipCode
                });
                return userObj.save();
            });
        }).then(result => {
            return res.status(201).json({msg: 'successfulll login.', result: result});
        })
        } else {
            res.status(500).send('Email already exists... ' + email);
        }
    })
    .catch(err => {
        res.status(501).send('Error ' + err);
    });
}

//Get User Role Page to assign roles to user
exports.getPageUserRoles =(req, res, next) => {
    User.findAll( {include: [{ all: true, nested: true }]} )
    .then( users => {
        return Role.findAll()
        .then(roles => {
            return res.status(200).json({
                users: users,
                roles: roles
            });
        });
    });
}
// Post Roles
exports.postRole = (req, res, next) => {
    const { title } = req.body;

        createRole({ title })
        .then(result => {
        res.status(201).json(result);
    })
    .catch(err => console.log(err));
}
// Post addUserRoles
exports.addUserRoles = (req, res, next) => {
    const { selectedRole, userId } = req.body;
    UserRole.findOne( {where: { userId: userId}})
    .then(user => {
        if(user) {
            return res.status(200).json(user);
        }
        UserRole.create({
            roleId: selectedRole,
            userId: userId
         })
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => console.log(err));
        })
        .catch(err => console.log(err)
    );
        
}
// Get All Users
exports.getUsers = (req, res, next) => {
    getAllUsers().then(users => {
        return res.status(200).json(users);
    });
};

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

exports.getCatagoriesAndZipCodes = (req, res, next) => {
    getAllZipcode().then(zipcodes => {
        return getAllCatagories().then(catagories => {
            return res.status(200).json({ catagories: catagories, zipcodes: zipcodes });
        })
    }).catch(err => console.log('getCatagoriesAndZipCodes>>>>>>>>.', err));
}
// ========================= Helper functions ===================================


// Create User
const createUser = async ({ firstName, lastName, email, password, zipcode }) => { 
    return await User.create({ 
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        zipcode: zipcode,
    });
};

// Get all Users
const getAllUsers = async () => {
    return await User.findAll({where: {isActive: true}});
};

// Get one user
const getUser = async obj => {
    return await User.findOne({
    where: obj,
  });
};

// User find by Id
const findById = async (id) => {
    return await User.findByPk(Id);
}


//Create Role
const createRole = async ({title}) => {
    return await Role.create({
        title: title
    });
}

// find user type Client

const findClientUserType = async () => {
    return await UserType.findOne({where: {title: 'client'}});
}

const getAllZipcode = async () => {
    return await User.findAll({attributes: [Sequelize.fn('DISTINCT', Sequelize.col('zipcode')) ,'zipcode'], where: { isActive: true, zipcode: {$ne:null}}});
}
//get All Catagory
const getAllCatagories = async () => {
    return await Catagory.findAll({where: {isActive: true}});
}