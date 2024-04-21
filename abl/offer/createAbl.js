const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);


const offerDao = require("../../dao/offer-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    description: { type: "string", minLength: 3},
    price: {type: "string"},
    unit: {type: "string"},
    tag: {type: "string"},
    category: {type: "string"}
  },
  required: ["name", "email", "description", "price", "unit", "tag", "category"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let offer = req.body;

    // validate input
    const valid = ajv.validate(schema, offer);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    offer.date = new Date().toISOString();

    const offerList = offerDao.list();
    const emailExists = offerList.some((u) => u.email === offer.email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Offer with email ${offer.email} already exists`,
      });
      return;
    }

    offer = offerDao.create(offer);
    res.json(offer);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;