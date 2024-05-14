const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const boardDao = require("../../dao/board-dao.js");
const userDao = require("../../dao/user-dao.js");

const schema = {
    type: "object",
    properties: {
        name: {type: "string", minLength: 3},
        description: {type: "string", minLength: 3},
        userId: {type: "string", minLength: 32, maxLength: 32},
        sharedWith: {
            type: "array",
            items: {type: "string", minLength: 32, maxLength: 32}
        }
    },
    required: ["name", "description", "userId"],
    additionalProperties: false
};

async function CreateAbl(req, res) {
    try {
        let dtoIn = req.body;


        // validate input
        const valid = ajv.validate(schema, dtoIn);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        // check if user exists
        const user = userDao.get(dtoIn.userId);
        if (!user) {
            res.status(404).json({
                code: "userNotFound",
                message: `User ${dtoIn.userId} not found`,
            });
            return;
        }

        const board = boardDao.create(dtoIn);
        res.json(board);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

module.exports = CreateAbl;
