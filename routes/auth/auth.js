const express = require('express');
const passport = require('passport');


const authController = require('../../controllers/auth');

const router = express.Router();


router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/saveUserRole', passport.authenticate('jwt', {session: false}), authController.addUserRoles);

router.get('/addUserRole', passport.authenticate('jwt', {session: false}), authController.getPageUserRoles);

// router.get('/users', passport.authenticate('jwt', {session: false}), authController.getUsers);

router.post('/addRole', passport.authenticate('jwt', {session: false}), authController.postRole);

router.post('/resetPassword', passport.authenticate('jwt', {session: false}), authController.postResetPassword);

module.exports = router;