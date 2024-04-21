const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/request/createAbl");
const GetAbl = require("../abl/request/getAbl");
const ListAbl = require("../abl/request/listAbl");
const UpdateAbl = require("../abl/request/updateAbl");
const DeleteAbl = require("../abl/request/deleteAbl");

router.post("/create", (req, res) => {
    CreateAbl(req, res);
});

router.get("/get", (req, res) => {
    GetAbl(req, res);
});

router.get("/list", (req, res) => {
    ListAbl(req, res);
});

router.post("/update", (req, res) => {
    UpdateAbl(req, res);
});

router.post("/delete", (req, res) => {
    DeleteAbl(req, res);
});

module.exports = router;