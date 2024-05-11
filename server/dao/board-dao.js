const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const listFolderPath = path.join(__dirname, "storage", "boardList");

// Method to read a board from a file
function get(listId) {
    try {
        const filePath = path.join(listFolderPath, `${listId}.json`);
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw {code: "failedToReadBoard", message: error.message};
    }
}

// Method to write a board to a file
function create(list) {
    list.createdAt = new Date().toISOString();
    list.modifiedAt = null;
    try {
        list.id = crypto.randomBytes(16).toString("hex");
        const filePath = path.join(listFolderPath, `${list.id}.json`);
        const fileData = JSON.stringify(list);
        fs.writeFileSync(filePath, fileData, "utf8");
        return list;
    } catch (error) {
        throw {code: "failedToCreateBoard", message: error.message};
    }
}

// Method to update board in a file
function update(list) {
    try {
        const currentList = get(list.id);
        if (!currentList) return null;
        const newList = {...currentList, ...list};
        const filePath = path.join(listFolderPath, `${list.id}.json`);
        newList.modifiedAt = new Date().toISOString();
        const fileData = JSON.stringify(newList);
        fs.writeFileSync(filePath, fileData, "utf8");
        return newList;
    } catch (error) {
        throw {code: "failedToUpdateBoard", message: error.message};
    }
}

// Method to remove a board from a file
function remove(listId) {
    try {
        const filePath = path.join(listFolderPath, `${listId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch (error) {
        if (error.code === "ENOENT") return {};
        throw {code: "failedToRemoveBoard", message: error.message};
    }
}

// Method to board lists in a folder
function list() {
    try {
        const files = fs.readdirSync(listFolderPath);
        const listList = files.map((file) => {
            const fileData = fs.readFileSync(
                path.join(listFolderPath, file),
                "utf8"
            );
            return JSON.parse(fileData);
        });
        listList.sort((a, b) => new Date(a.modifiedAt ? a.modifiedAt : a.createdAt) - new Date(b.modifiedAt ? b.modifiedAt : b.createdAt));
        return listList;
    } catch (error) {
        throw {code: "failedToListBoards", message: error.message};
    }
}



module.exports = {
    get,
    create,
    update,
    remove,
    list,
};
