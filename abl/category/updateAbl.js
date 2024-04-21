const Ajv = require("ajv");
const ajv = new Ajv();

const offerDao = require("../../dao/offer-dao.js");
const requestDao = require("../../dao/request-dao.js");
const categoryDao = require("../../dao/category-dao.js");

const schema = {
  type: "object",
  properties: {
    category: {type: "string"}
  },
  required: ["category"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let dtoIn = req.body;

    // validate input
    const valid = ajv.validate(schema, dtoIn);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // check if category exists
    const user = categoryDao.get(dtoIn.category);
    if (!category) {
      res.status(404).json({
        code: "categoryNotFound",
        message: `Category ${dtoIn.category} not found`,
      });
      return;
    }


    let category = categoryDao.get(dtoIn.category, dtoIn.category);
    category = { ...(category || {}), ...dtoIn };

    
    res.json(category);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;