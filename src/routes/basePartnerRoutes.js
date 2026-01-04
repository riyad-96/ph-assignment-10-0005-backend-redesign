// External modules
const express = require('express');

// Local modules
const getPartnerProfileBasedOnQuery = require('../controllers/basePartnerControllers/getPartnerProfileBasedOnQuery');
const getInitialData = require('../controllers/basePartnerControllers/getInitialData');

const router = express.Router();

router.get('/initial-data', getInitialData);
router.post('/query', getPartnerProfileBasedOnQuery);

module.exports = router;
