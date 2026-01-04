// External modules
const express = require('express');

// Local modules
const {
  sendPartnerRequest,
  allRequests,
  removeConnection,
  updatePartnerProfile,
} = require('../controllers/magagePartner.controller');
const getPartnerProfile = require('../controllers/getPartnerProfile.controller');

const router = express();

router.get('/single-partner-profile/:id', getPartnerProfile);
router.post('/send-request', sendPartnerRequest);
router.get('/all-requests', allRequests);
router.post('/remove-connection', removeConnection);
router.post('/update-partner-profile', updatePartnerProfile);

module.exports = router;
