const express = require('express');
const passport = require('passport');


const authController = require('../../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

router.get('/index', authController.getIndex);

router.get('/logout', passport.authenticate('jwt', {session: false}), authController.getLogout);

router.post('/saveUserRole', passport.authenticate('jwt', {session: false}), authController.addUserRoles);

router.get('/addUserRole', passport.authenticate('jwt', {session: false}), authController.getPageUserRoles);
// router.post('/addRole', authController.postRole);

router.get('/users', passport.authenticate('jwt', {session: false}), authController.getUsers);

router.post('/addRole', passport.authenticate('jwt', {session: false}), authController.postRole);

module.exports = router;