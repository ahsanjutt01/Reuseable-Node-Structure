const express = require('express');
const passport = require('passport');
const { check, body } = require('express-validator/check');

const helper = require('../../_helpers/helper');

const adminController = require('../../controllers/admin');
const listinghelper = require('../../_helpers/listingHelper');

const router = express.Router();


router.post('/updateUser', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.updateUser);

router.post('/signup', check('email').isEmail()
.withMessage('please enter a valid email')
.normalizeEmail(),
// body('password', 'please enter a password with only numbers and text and at lest 8 characters.')
// .isLength({min: 8})
// .isAlphanumeric()
// .trim(),
adminController.postSignup);

router.get('/getAdminUsers', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.getAdminUsers);

router.get('/getClientUsers', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.getClientUsers);

router.post('/resetPassword', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.postResetPassword);

router.get('/getAllCatagories', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.getAllCatagories);

router.post('/createCatagory', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.postCatagory);

router.post('/deleteCatagory', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.postDeleteCatagory);

router.post('/updateCatagory', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.postUpdateCatagory);

router.post('/createListing', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.postListing);

router.get('/getListings', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.getAllListing);

router.get('/getOneListing', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.getOneListing);

router.post('/updateListing', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.postupdateListing);

router.post('/deleteAdminUser', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.postDeleteAdminUser);

router.get('/getFilteredListing', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.getFilterListing);

router.get('/getFilterCategories', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.getFilterCategories);

router.get('/getFilteredAdminUsers', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.getFilteredAdminUsers);

router.get('/getFilteredUsers', passport.authenticate('jwt', {session: false}), helper.isAdmin, adminController.getFilteredUsers);

router.post('/markListingImageDefault', passport.authenticate('jwt', {session: false}), helper.isAdmin, listinghelper.postMarkListingImageDefault);

router.post('/deleteListingImage', passport.authenticate('jwt', {session: false}), helper.isAdmin, listinghelper.postDeleteLisitngImage);

router.post('/postListingImage', passport.authenticate('jwt', {session: false}),  helper.isAdmin,listinghelper.postUploadlistingImage);

module.exports = router;

