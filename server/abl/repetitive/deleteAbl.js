const Ajv = require("ajv");
const ajv = new Ajv();
const repetitiveDao = require("../../dao/repetitive-dao.js");

const schema = {
    type: "object",
    properties: {
        id: {type: "string", minLength: 32, maxLength: 32},
    },
    required: ["id"],
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
        // todo check if there are no tasks with this repetitive


        repetitiveDao.remove(reqParams.id);
        res.json({});
    } catch (e) {
        res.status(500).json({note: e.note});
    }
}

module.exports = DeleteAbl;
