const requestDao = require("../../dao/request-dao.js");

async function ListAbl(req, res) {
  try {
    const requestList = requestDao.list();
    res.json(requestList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;