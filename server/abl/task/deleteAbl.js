const Ajv = require("ajv");
const ajv = new Ajv();
const taskDao = require("../../dao/task-dao.js");

const schema = {
    type: "object",
    properties: {
        id: {type: "string", minLength: 32, maxLength: 32},
        boardId: {type: "string", minLength: 32, maxLength: 32},
        userId: {type: "string", minLength: 32, maxLength: 32},
    },
    required: ["id", "boardId", "userId"],
    additionalProperties: false,
};

async function DeleteAbl(req, res) {
    try {
        // get request query or body
        const reqParams = req.body;

        // validate input
        const valid = ajv.validate(schema, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                note: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        // todo check if I have permissions to do that
        taskDao.remove(reqParams.id);
        res.json({});
    } catch (e) {
        res.status(500).json({note: e.note});
    }
}

module.exports = DeleteAbl;
