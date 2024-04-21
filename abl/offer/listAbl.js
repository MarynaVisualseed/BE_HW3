const offerDao = require("../../dao/offer-dao.js");

async function ListAbl(req, res) {
  try {
    const offerList = offerDao.list();
    res.json(offerList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;