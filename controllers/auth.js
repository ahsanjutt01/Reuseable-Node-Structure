const jwt = require('jsonwebtoken');
const becrypt = require('bcryptjs');

const User = require('../models/user');
const Role = require('../models/role');
const UserRole = require('../models/user-role');

"use strict"


//Get Index Page

exports.getIndex = (req, res, next) => {
    return res.render('Index');
}
exports.getLogout = (req, res, next)  => {
    res.clearCookie('jwt');
    return res.redirect('/login');
}
// Get Login Page
exports.getLogin = (req, res, next) => {
    return res.render('login/login');
}
//Post Login
exports.postLogin = (req, res, next) => {

    const { email, password } = req.body;
    console.log(email + ' ' + password);
    if (email && password) {
        let loadedUser;
        getUser({Email: email})
        .then(user => {
            if(!user) {
                return res.redirect('/login');
                // return res.status(401).json({msg: 'Please signup first then login'});
                // return res.status(200).render('signup/signup.ejs', {
                //     login: 'Login Page'
                // });
            }
            loadedUser = user;
            return becrypt.compare(password, user.Password);
        }).then(isEqual => {
            if (isEqual) {
                let payload = { id: loadedUser.Id };
                let token = jwt.sign(payload, req.jwtOptions.secretOrKey);

                res.cookie('jwt', token);
                return res.redirect('/Index');
            }
            else {
                return res.redirect('/login');
                // return res.status(401).json({msg: 'Email or password is invalid'});
                // return res.render('signup/signup', {
                //     title: 'Signup'
                // });
            }
        }).catch(err => console.log(err));
    } else {
        console.log('else runn');
        return res.redirect('/login');
    }
    // res.status(200).render('login/login.ejs', {
    //     login: 'Login Page'
    // });
}

exports.getSignup = (req, res, next) => {
    return res.render('signup/signup');
}

// Post Signup
exports.postSignup = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    // console.log(firstName + ' ' + lastName + ' ' + email + ' ' + password);
    getUser({Email: email}).then(user => {
        if(!user) {
            becrypt.hash(password, 12)
        .then( hashedPassword => {
            console.log(hashedPassword);
            const userObj = new User({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Password: hashedPassword
            });
            return userObj.save();
            // return createUser({firstName, lastName, email, hashedPassword});
        }).then(result => {
            // res.status(201).send(result);
            return res.redirect('/login');
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
            return res.render('userRole/saveUserRole', {
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
            return res.redirect('addUserRole');
        }
        UserRole.create({
            roleId: selectedRole,
            userId: userId
         })
        .then(result => {
            return res.redirect('addUserRole');
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


// Helper functions

// Create User
const createUser = async ({ firstName, lastName, email, password }) => { 
    return await User.create({ 
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password
    });
};

// Get all Users
const getAllUsers = async () => {
    return await User.findAll();
};

// Get one user
const getUser = async obj => {
    return await User.findOne({
    where: obj,
  });
};


//Create Role
const createRole = async ({title}) => {
    return await Role.create({
        Title: title
    });
}