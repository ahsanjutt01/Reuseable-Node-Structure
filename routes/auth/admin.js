const express = require('express');
const passport = require('passport');


const adminController = require('../../controllers/admin');

const router = express.Router();


router.post('/updateUser', passport.authenticate('jwt', {session: false}), adminController.updateUser);

router.post('/signup', passport.authenticate('jwt', {session: false}), adminController.postSignup);

router.post('/resetPassword', passport.authenticate('jwt', {session: false}), authController.postResetPassword);

module.exports = router;

