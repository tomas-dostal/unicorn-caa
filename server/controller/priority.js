const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/repetitive/getAbl");
const ListAbl = require("../abl/repetitive/listAbl");
const CreateAbl = require("../abl/repetitive/createAbl");
const UpdateAbl = require("../abl/repetitive/updateAbl");
const DeleteAbl = require("../abl/repetitive/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
