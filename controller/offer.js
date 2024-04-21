const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/offer/createAbl");
const GetAbl = require("../abl/offer/getAbl");
const ListAbl = require("../abl/offer/listAbl");
const UpdateAbl = require("../abl/offer/updateAbl");
const DeleteAbl = require("../abl/offer/deleteAbl");

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