const { ObjectId } = require('mongodb');
const { getDB } = require('../db/establishConnection');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getPartnerProfile(req, res) {
  try {
    const email = res.locals.userInfo.email;
    const id = req.params;

    const basepartnersCollection = getDB().collection('basepartners');
    const partnerProfile = await basepartnersCollection.findOne({ _id: new ObjectId(id) });

    const partnerRequestCollection = getDB().collection('partner-requests');
    const isPartner = await partnerRequestCollection.findOne({
      requestBy: email,
      originalId: new ObjectId(id),
    });

    if (partnerProfile) {
      res.send({ partner: partnerProfile, isPartner: isPartner ? true : false });
    } else {
      res.status(404).send({ message: 'profile-not-found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'server-error' });
  }
}
module.exports = getPartnerProfile;
