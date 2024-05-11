const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const priorityFolderPath = path.join(__dirname, "storage", "priorityList");

// Method to read a priority from a file
function get(priorityId) {
    try {
        const filePath = path.join(priorityFolderPath, `${priorityId}.json`);
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw {code: "failedToReadPriority", message: error.message};
    }
}

// Method to write a priority to a file
function create(priority) {
    try {
        priority.id = crypto.randomBytes(16).toString("hex");
        const filePath = path.join(priorityFolderPath, `${priority.id}.json`);
        const fileData = JSON.stringify(priority);
        fs.writeFileSync(filePath, fileData, "utf8");
        return priority;
    } catch (error) {
        throw {code: "failedToCreatePriority", message: error.message};
    }
}

// Method to update priority in a file
function update(priority) {
    try {
        const currentPriority = get(priority.id);
        if (!currentPriority) return null;
        const newPriority = {...currentPriority, ...priority};
        const filePath = path.join(priorityFolderPath, `${priority.id}.json`);
        const fileData = JSON.stringify(newPriority);
        fs.writeFileSync(filePath, fileData, "utf8");
        return newPriority;
    } catch (error) {
        throw {code: "failedToUpdatePriority", message: error.message};
    }
}

// Method to remove a priority from a file
function remove(priorityId) {
    try {
        const filePath = path.join(priorityFolderPath, `${priorityId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch (error) {
        if (error.code === "ENOENT") {
            return {};
        }
        throw {code: "failedToRemovePriority", message: error.message};
    }
}

// Method to board prioritys in a folder
function list() {
    try {
        const files = fs.readdirSync(priorityFolderPath);
        const priorityList = files.map((file) => {
            const fileData = fs.readFileSync(path.join(priorityFolderPath, file), "utf8");
            return JSON.parse(fileData);
        });
        return priorityList;
    } catch (error) {
        throw {code: "failedToListPrioritys", message: error.message};
    }
}

function isListSharedWith(list, priorityId) {
    return list.sharedWith.some(sharedPriority => sharedPriority.priorityId === priorityId);
}

module.exports = {
    get,
    create,
    update,
    remove,
    list,
};
