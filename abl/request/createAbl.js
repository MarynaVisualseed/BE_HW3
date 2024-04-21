const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

// const validateDateTime = require("../../helpers/validate-date-time.js");
// ajv.addFormat("date-time", { validate: validateDateTime });

const requestDao = require("../../dao/request-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    description: { type: "string", minLength: 3},
    payment: {type: "string"},
    unit: {type: "string"},
    tag: {type: "string"},
    category: {type: "string"}
  },
  required: ["name", "email", "description", "payment", "unit", "tag", "category"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let request = req.body;

    // validate input
    const valid = ajv.validate(schema, request);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    request.date = new Date().toISOString();

    const requestList = requestDao.list();
    const emailExists = requestList.some((u) => u.email === request.email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Request with email ${request.email} already exists`,
      });
      return;
    }

    request = requestDao.create(request);
    res.json(request);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;