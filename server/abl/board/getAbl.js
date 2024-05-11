const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const boardDao = require("../../dao/board-dao.js");

const schema = {
    type: "object",
    properties: {
        id: {type: "string", minLength: 32, maxLength: 32},
    },
    required: ["id"],
    additionalProperties: false,
};

async function GetAbl(req, res) {
    try {
        // get request query or body
        const reqParams = req.query?.id ? req.query : req.body;

        // validate input
        const valid = ajv.validate(schema, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        // read board by given id
        const board = boardDao.get(reqParams.id);
        if (!board) {
            res.status(404).json({
                code: "boardNotFound",
                message: `Board ${reqParams.id} not found`,
            });
            return;
        }

        // board.userMap =
        //     attendanceMap[reqParams.id] || {};

        res.json(board);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

module.exports = GetAbl;
