const { getDB } = require('../../db/establishConnection');

/**
 * @param {import("express").Request} req
 * @param {import('express').Response} res
 */
async function getInitialData(req, res) {
  try {
    // return top study mates
    const basepartnersCollection = getDB().collection('basepartners');
    const topStudyPartners = await basepartnersCollection
      .find()
      .sort({ rating: -1 })
      .limit(6)
      .toArray();

    const reviews = await basepartnersCollection
      .find()
      .project({
        profileImage: 1,
        name: 1,
      })
      .limit(4)
      .toArray();

    const initialData = {
      topStudyPartners,
      reviews,
    };

    res.send(initialData);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'server-error' });
  }
}

module.exports = getInitialData;
