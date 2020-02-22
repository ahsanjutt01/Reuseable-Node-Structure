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

router.post('/createListing', passport.authenticate('jwt', {session: false}), adminController.postListing);

router.get('/getListings', passport.authenticate('jwt', {session: false}), adminController.getAllListing);

router.get('/getOneListing', passport.authenticate('jwt', {session: false}), adminController.getOneListing);

router.post('/updateListing', passport.authenticate('jwt', {session: false}), adminController.postupdateListing);

router.post('/deleteAdminUser', passport.authenticate('jwt', {session: false}), adminController.postDeleteAdminUser);

router.get('/getFilteredListing', passport.authenticate('jwt', {session: false}), adminController.getFilterListing);

router.get('/getFilterCategories', passport.authenticate('jwt', {session: false}), adminController.getFilterCategories);

router.get('/getFilteredAdminUsers', passport.authenticate('jwt', {session: false}), adminController.getFilteredAdminUsers);

router.get('/getFilteredUsers', passport.authenticate('jwt', {session: false}), adminController.getFilteredUsers);

module.exports = router;

