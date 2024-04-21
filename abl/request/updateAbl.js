const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const requestDao = require("../../dao/request-dao.js");

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

    const requestList = requestDao.list();
    const emailExists = requestList.some(
      (u) => u.email === request.email && u.id !== request.id
    );
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Request with email ${request.email} already exists`,
      });
      return;
    }

    const updatedRequest = requestDao.update(request);
    if (!updatedRequest) {
      res.status(404).json({
        code: "requestNotFound",
        message: `Request ${request.id} not found`,
      });
      return;
    }

    res.json(updatedRequest);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;