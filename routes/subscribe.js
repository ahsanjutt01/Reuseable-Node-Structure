const express = require('express');

const subscirbeController = require('../controllers/subscribe');
const router = express.Router();

router.post('/addSubscription', subscirbeController.postSubscribe);

router.get('/getAllSubscribers', subscirbeController.getAllSubscribers);

module.exports = router;