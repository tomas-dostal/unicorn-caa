const Ajv = require("ajv");
const ajv = new Ajv();

const priorityDao = require("../../dao/priority-dao.js");

const schema = {
    type: "object",
    properties: {
        name: {type: "string"},
        description: {type: "string"},
        value: {type: "integer"},
    },
    required: ["name", "description", "value"],
    additionalProperties: false,
};

async function CreateAbl(req, res) {
    try {
        let priority = req.body;

        // validate input
        const valid = ajv.validate(schema, priority);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        priority = priorityDao.create(priority);
        res.json(priority);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


module.exports = CreateAbl;