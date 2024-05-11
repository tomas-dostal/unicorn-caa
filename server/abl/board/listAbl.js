const boardDao = require("../../dao/board-dao.js");
const taskDao = require("../../dao/task-dao.js");

async function ListAbl(req, res) {
    try {
        const boardList = boardDao.list();



        const itemsMap = taskDao.boardMap();

        boardList.forEach((board) => {
            board.taskMap = taskDao[board.id] || {};
        });

        res.json(boardList);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

module.exports = ListAbl;
