const taskDao = require("../../dao/task-dao.js");

async function ListAbl(req, res) {
    try {
        const itemList = taskDao.list();
        res.json(itemList);
    } catch (e) {
        res.status(500).json({note: e.note});
    }
}

module.exports = ListAbl;
