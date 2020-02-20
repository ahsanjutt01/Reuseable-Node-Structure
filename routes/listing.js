const express = require('express');
const passport = require('passport');


const adminController = require('../controllers/admin');
const listingController = require('../controllers/listing');

const router = express.Router();

router.get('/getAllListingForClients', listingController.getAllListingForClients);

router.get('/getAllCatagories', adminController.getAllCatagories);

router.get('/getListingBeforeLogin', listingController.getAllListingForClientsBeforeLogin);

router.get('/searchByName', listingController.getSearchByName);

router.post('/getListingByCatgoryIdBeforeLogin', listingController.getListingByCatgoriesBeforeLogin);

router.get('/getMyListing', passport.authenticate('jwt', {session: false}), listingController.getMyListing);

router.get('/getListingByCatgoryId', passport.authenticate('jwt', {session: false}), listingController.getListingByCatgories);

router.post('/createListing', passport.authenticate('jwt', {session: false}), adminController.postListing);

module.exports = router;