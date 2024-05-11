const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/board/getAbl");
const ListAbl = require("../abl/board/listAbl");
const CreateAbl = require("../abl/board/createAbl");
const UpdateAbl = require("../abl/board/updateAbl");
const DeleteAbl = require("../abl/board/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
