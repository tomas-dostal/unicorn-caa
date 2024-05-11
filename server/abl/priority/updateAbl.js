const Ajv = require("ajv");
const ajv = new Ajv();

const priorityDao = require("../../dao/priority-dao.js");


const schema = {

    type: "object",
    properties: {
        id: {type: "string", minLength: 32, maxLength: 32},
        name: {type: "string"},
        description: {type: "string"},
        value: {type: "int32"},
    },
    required: ["name", "description", "value"],
    additionalProperties: false,
};

async function UpdateAbl(req, res) {
    try {
        let item = req.body;

        // validate input
        const valid = ajv.validate(schema, item);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid", message: "dtoIn is not valid", validationError: ajv.errors,
            });
            return;
        }

        const updatedPriority = priorityDao.update(item);

        if (!updatedPriority) {
            res.status(404).json({
                code: "itemNotFound", message: `Priority ${item.id} not found`,
            });
            return;
        }

        res.json(updatedPriority);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

module.exports = UpdateAbl;
