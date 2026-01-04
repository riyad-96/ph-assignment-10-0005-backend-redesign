// External modules
const express = require('express');

// Local modules
const verifyFirebaseAccessToken = require('../middlewares/verifyFirebaseAccessToken');
const basePartnerRouter = require('./basePartnerRoutes');
const userRouter = require('./userRoutes');
const managePartnerRequestRouter = require('./managePartnerRequestRoutes');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Server studymate redesigned');
});

router.use('/base-partner', basePartnerRouter);
router.use('/user', verifyFirebaseAccessToken, userRouter);
router.use('/partner-request', verifyFirebaseAccessToken, managePartnerRequestRouter);

module.exports = router;
