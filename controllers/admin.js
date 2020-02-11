const jwt = require('jsonwebtoken');
const becrypt = require('bcryptjs');

const User = require('../models/user');
const Role = require('../models/role');
const UserRole = require('../models/user-role');
const UserType = require('../models/userType');


exports.updateUser = (req, res, next) => {
    const { userId, firstName, lastName, email, zipCode } = req.body;
    // console.log('=================================',userId, firstName, lastName, email, zipCode);
    const user = req.jwtOptions.user;
    return findById(userId).then(userFromDb => {
        if(!userFromDb) {
            return res.status(500).json({msg: 'we can not find user'});
        } else {
            userFromDb.firstName = firstName;
            userFromDb.lastName = lastName;
            userFromDb.email = email;
            userFromDb.zipCode = zipCode == null ;
            return userFromDb.save().then(result => {
                return res.status(200).json({msg: 'update Successfull', result: result});
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
    const { firstName, lastName, email, password, isAgreeTerms} = req.body;
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
                    userTypeId: userTypeId
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