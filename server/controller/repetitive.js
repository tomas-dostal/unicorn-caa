const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/priority/getAbl");
const ListAbl = require("../abl/priority/listAbl");
const CreateAbl = require("../abl/priority/createAbl");
const UpdateAbl = require("../abl/priority/updateAbl");
const DeleteAbl = require("../abl/priority/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
