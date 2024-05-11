const repetitiveDao = require("../../dao/repetitive-dao.js");

async function ListAbl(req, res) {
    try {
        const repetitiveList = repetitiveDao.list();
        res.json(repetitiveList);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

module.exports = ListAbl;
