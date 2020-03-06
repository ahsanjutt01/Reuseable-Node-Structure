const express = require('express');
const passport = require('passport');
const { check, body } = require('express-validator/check');

const helper = require('../../_helpers/helper');

const adminController = require('../../controllers/admin');

const router = express.Router();


router.post('/updateUser', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.updateUser);

router.post('/signup', 
check('email').isEmail()
.withMessage('please enter a valid email')
.normalizeEmail(),
// body('password', 'please enter a password with only numbers and text and at lest 8 characters.')
// .isLength({min: 8})
// .isAlphanumeric()
// .trim(),
adminController.postSignup);

router.post('/postClient', 
check('email').isEmail()
.withMessage('please enter a valid email')
.normalizeEmail(),
// body('password', 'please enter a password with only numbers and text and at lest 8 characters.')
// .isLength({min: 8})
// .isAlphanumeric()
// .trim(),
adminController.postClient);

router.get('/getAdminUsers', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.getAdminUsers);

router.get('/getClientUsers', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.getClientUsers);

router.post('/resetPassword', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.postResetPassword);

router.post('/deleteAdminUser', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.postDeleteAdminUser);

router.get('/getUsersCount', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.getUsersCount);

module.exports = router;

