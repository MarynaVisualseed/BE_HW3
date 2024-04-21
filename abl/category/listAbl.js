
const categoryDao = require("../../dao/category-dao.js");

async function listAbl(req, res) {
  try {
    const allObjects = categoryDao.getAll();
    res.json(allObjects);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = listAbl;







