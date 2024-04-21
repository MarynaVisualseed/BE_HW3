const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const offerDao = require("../../dao/offer-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    name: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    const offerList = offerDao.list();
    const emailExists = offerList.some(
      (u) => u.email === offer.email && u.id !== offer.id
    );
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Offer with email ${offer.email} already exists`,
      });
      return;
    }

    const updatedOffer = offerDao.update(offer);
    if (!updatedOffer) {
      res.status(404).json({
        code: "offerNotFound",
        message: `Offer ${offer.id} not found`,
      });
      return;
    }

    res.json(updatedOffer);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;