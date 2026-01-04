const { getDB } = require('../../db/establishConnection');

/**
 * @param {import("express").Request} req
 * @param {import('express').Response} res
 * @typedef {import('mongodb').FindOptions} query
 */
async function getPartnerProfileBasedOnQuery(req, res) {
  try {
    const body = req.body;
    const rating = body.rating;
    const studyMode = body.studyMode;
    const experience = body.experience;
    const search = body.search;
    const page = body.page || 1;
    const profilePerPage = 6;

    const query = {};
    const sorts = {};

    if (rating) sorts.rating = rating === 'asc' ? 1 : -1;
    if (studyMode) query.studyMode = studyMode;
    if (experience) query.experienceLevel = experience;
    if (search)
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { availabilityTime: { $regex: search, $options: 'i' } },
        { experienceLevel: { $regex: search, $options: 'i' } },
        { studyMode: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];

    const basepartnersCollection = getDB().collection('basepartners');
    const profiles = await basepartnersCollection
      .find(query)
      .sort(sorts)
      .skip((page - 1) * profilePerPage)
      .limit(profilePerPage)
      .toArray();

    const totalProfiles = await basepartnersCollection.countDocuments(query);

    res.send({
      profiles,
      totalProfiles,
    });
  } catch {
    res.status(500).send({ message: 'server-error' });
  }
}

module.exports = getPartnerProfileBasedOnQuery;
