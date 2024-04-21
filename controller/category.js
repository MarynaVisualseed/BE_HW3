const express = require("express");
const router = express.Router();

const ListAbl = require("../abl/category/listAbl");

router.get("/list", ListAbl);

module.exports = router;