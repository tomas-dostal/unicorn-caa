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

        // read repetitive by given id
        const repetitive = repetitiveDao.get(reqParams.id);
        if (!repetitive) {
            res.status(404).json({
                code: "repetitiveNotFound",
                note: `Priority ${reqParams.id} not found`,
            });
            return;
        }

        res.json(repetitive);
    } catch (e) {
        res.status(500).json({note: e.note});
    }
}

module.exports = GetAbl;
