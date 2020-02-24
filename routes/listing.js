const express = require('express');
const passport = require('passport');
const { check, body } = require('express-validator/check');


const helper = require('../_helpers/helper');
const adminController = require('../controllers/admin');
const listingController = require('../controllers/listing');
const listinghelper = require('../_helpers/listingHelper');

const router = express.Router();

router.get('/getAllListingForClients', listingController.getAllListingForClients);

router.get('/getAllCatagories', adminController.getAllCatagories);

router.get('/getListingBeforeLogin', listingController.getAllListingForClientsBeforeLogin);

router.get('/searchByName', listingController.getSearchByName);

router.post('/getListingByCatgoryIdBeforeLogin', listingController.getListingByCatgoriesBeforeLogin);

router.get('/getMyListing', passport.authenticate('jwt', {session: false}), helper.isClient, listingController.getMyListing);

router.get('/getListingByCatgoryId', passport.authenticate('jwt', {session: false}), helper.isClient, listingController.getListingByCatgories);

router.post('/createListing', passport.authenticate('jwt', {session: false}), helper.isClient, adminController.postListing);

router.post('/markListingImageDefault', passport.authenticate('jwt', {session: false}), helper.isClient, listinghelper.postMarkListingImageDefault);

router.post('/deleteListingImage', passport.authenticate('jwt', {session: false}), helper.isClient, listinghelper.postDeleteLisitngImage);

router.post('/postListingImage', passport.authenticate('jwt', {session: false}), helper.isClient, listinghelper.postUploadlistingImage);

router.post('/updateListing', passport.authenticate('jwt', {session: false}), helper.isClient, adminController.postupdateListing);

router.post('/deleteListing', passport.authenticate('jwt', {session: false}), helper.isClient, listinghelper.postDeleteLisitng);

router.get('/getOneListing', passport.authenticate('jwt', {session: false}), helper.isClient, adminController.getOneListing);

router.post('/updateUser', passport.authenticate('jwt', {session: false}), helper.isClient, adminController.updateUser);

router.post('/updateProfile', check('email').isEmail()
.withMessage('please enter a valid email')
.normalizeEmail(),
// body('firstName', 'please enter the first Name')
// body('password', 'please enter a password with only numbers and text and at lest 8 characters.')
// .isLength({min: 8})
// .isAlphanumeric()
// .trim(),
listingController.updateUser);

module.exports = router;