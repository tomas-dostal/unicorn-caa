const Ajv = require("ajv");
const ajv = new Ajv();
const priorityDao = require("../../dao/priority-dao.js");

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
                note: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        // read priority by given id
        const priority = priorityDao.get(reqParams.id);
        if (!priority) {
            res.status(404).json({
                code: "priorityNotFound",
                note: `Priority ${reqParams.id} not found`,
            });
            return;
        }

        res.json(priority);
    } catch (e) {
        res.status(500).json({note: e.note});
    }
}

module.exports = GetAbl;
