const Ajv = require("ajv");
const ajv = new Ajv();

const taskDao = require("../../dao/task-dao.js");

const schema = {
  type: "object",
  properties: {
    name: {type: "string"},
    description: {type: "string"},

    boardId: {type: "string", minLength: 32, maxLength: 32},
    authorId: {type: "string", minLength: 32, maxLength: 32},
    assigneeId: {type: "string", minLength: 32, maxLength: 32},
    priorityId: {type: "string", minLength: 32, maxLength: 32},
    // Fucking do now = 1000
    // Can wait till tomorrow  =
    // Can wait till next week  =
    // Can wait for to weeks  = 10000
    // Can wait for a month  = 1000
    // Can wait 3 months  = 100
    // Can wait 6 months  = 10
    // Can wait 12 months = 1

    status: {enum: ["created", "in progress", "blocked", "postponed", "freezer", "done"]},


    timeComplexityId: {type: "string", minLength: 32, maxLength: 32},
    // 1 Ezy 15min
    // 2 Moderate 30min
    // 3 Normal 1h
    // 4 1h
    // 5 3h
    // 10 8h
    // Over 8 hours I need to create subtasks/children

    createdDate: {type: "timestamp"},
    startDate: {type: "timestamp"},
    dueDate: {type: "timestamp"},

    repetitive: {
      type: "object",
      properties: {
        active: {type: "boolean", default: true},
        period: {type: "timestamp"},
      },
      optionalProperties: {
        listCompletedDates: {
          type: "array",
          items: {
            type: "object",
            properties: {
              competedDate: {type: "string", minLength: 24, maxLength: 24}
            },
            required: ["competedDate"],
            additionalProperties: false
          }
        },

      },
      required: ["active", "period"],
      additionalProperties: true
    },
    children: {
      type: "array",
      items: {
        type: "object",
        properties: {
          subtaskId: {type: "string", minLength: 32, maxLength: 32}
        },
        required: ["subtaskId"],
        additionalProperties: false
      }
    },

  },
  required: ["name", "boardId", "authorId"],
  additionalProperties: false
};


async function CreateAbl(req, res) {
  try {
    let task = req.body;

    // validate input
    const valid = ajv.validate(schema, task);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    task.createdAt = new Date().toISOString();
    task.finished = task.finished !== null ? task.finished : false;
    task = taskDao.create(task);
    res.json(task);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
}


module.exports = CreateAbl;