const jwt = require('jsonwebtoken');
const becrypt = require('bcryptjs');

const User = require('../models/user');
const Role = require('../models/role');
const UserRole = require('../models/user-role');
const UserType = require('../models/userType');
const Catagory = require('../models/catagory');

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
    const { firstName, lastName, email, password, isAgreeTerms, zipCode} = req.body;
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


//================================= END USER MIDDLEWARE ====================================


//================================= START CATAGORY MIDDLEWARE ====================================

// Get All Catagories

exports.getAllCatagories = (req, res, next) => {
    getAllCatagories().then(catagories => {
        res.status(200).json({catagories: catagories});
    }).catch(err => console.log(err));
}

// Post/Create Catagory

exports.postCatagory = (req, res, next) => {
    const { title } = req.body;

    createCatagory(title).then(catagory => {
        res.status(201).json(catagory);
    }).catch(err => console.log(err));
}

//  post Delete Catagory

exports.postDeleteCatagory = (req, res, next) => {
    const { id } = req.body;

    deleteCatagory(id).then(catagory => {
        res.status(200).json({msg: 'Delete Catagory successfully.'});
    })
}

//  Post Update Catagory

exports.postUpdateCatagory = (req, res, next) => {
    const {id, title} = req.body;

    updateCatagory(id, title).then(catagory => {
        res.status(200).json({msg: 'Update successfully', catagory: catagory});
    }).catch(err => console.log(err));
}



//================================= END CATAGORY MIDDLEWARE ====================================




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
        return User.findAll({where: {isActive: true, userTypeId: type.id}});
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

//============================== CATAGORY HELPER Functions ==========================================

//Create Catagory 
const createCatagory = async (title) => {
    return await Catagory.create({
        title: title,
        isActive: true,
    });
}

//Update Catagory 
const updateCatagory = async (id, title) => {
    return await findCatagoryById(id).then( catagory => {
            catagory.title = title;
            return catagory.save();
    }).catch(err => console.log(err));
}

//Delete Catagory
const deleteCatagory = async (id) => {
    return await findCatagoryById(id).then( catagory => {
        catagory.isActive = false;
        return catagory.save();
    }).catch(err => console.log(err));
}

//Find by id Catagory 
const findCatagoryById = async (id) => {
return await Catagory.findByPk(id);
}

//get All Catagory
const getAllCatagories = async () => {
    return await Catagory.findAll({where: {isActive: true}});
}
