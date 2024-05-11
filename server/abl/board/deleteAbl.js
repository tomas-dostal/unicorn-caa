const Ajv = require("ajv");
const ajv = new Ajv();

const boardDao = require("../../dao/board-dao.js");

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
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        // const attendanceMap = attendanceDao.boardMap();
        // if (attendanceMap[reqParams.id]) {
        //     res.status(400).json({
        //         code: "boardHasAttendances",
        //         message: `Board ${reqParams.id} has attendances`,
        //     });
        //     return;
        // }

        boardDao.remove(reqParams.id);
        res.json({});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

module.exports = DeleteAbl;
