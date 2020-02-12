const express = require('express');
const passport = require('passport');


const adminController = require('../../controllers/admin');

const router = express.Router();


router.post('/updateUser', passport.authenticate('jwt', {session: false}), adminController.updateUser);

router.post('/signup', adminController.postSignup);

router.get('/getAdminUsers', passport.authenticate('jwt', {session: false}), adminController.getAdminUsers);

router.get('/getClientUsers', passport.authenticate('jwt', {session: false}), adminController.getClientUsers);

router.post('/resetPassword', passport.authenticate('jwt', {session: false}), adminController.postResetPassword);

router.get('/getAllCatagories', passport.authenticate('jwt', {session: false}), adminController.getAllCatagories);

router.post('/createCatagory', passport.authenticate('jwt', {session: false}), adminController.postCatagory);

router.post('/deleteCatagory', passport.authenticate('jwt', {session: false}), adminController.postDeleteCatagory);

router.post('/updateCatagory', passport.authenticate('jwt', {session: false}), adminController.postUpdateCatagory);


module.exports = router;

