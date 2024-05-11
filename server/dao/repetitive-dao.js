const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const repetitiveFolderPath = path.join(__dirname, "storage", "repetitiveList");

// Method to read a repetitive from a file
function get(repetitiveId) {
    try {
        const filePath = path.join(repetitiveFolderPath, `${repetitiveId}.json`);
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw {code: "failedToReadRepetitive", message: error.message};
    }
}

// Method to write a repetitive to a file
function create(repetitive) {
    try {
        repetitive.id = crypto.randomBytes(16).toString("hex");
        const filePath = path.join(repetitiveFolderPath, `${repetitive.id}.json`);
        const fileData = JSON.stringify(repetitive);
        fs.writeFileSync(filePath, fileData, "utf8");
        return repetitive;
    } catch (error) {
        throw {code: "failedToCreateRepetitive", message: error.message};
    }
}

// Method to update repetitive in a file
function update(repetitive) {
    try {
        const currentRepetitive = get(repetitive.id);
        if (!currentRepetitive) return null;
        const newRepetitive = {...currentRepetitive, ...repetitive};
        const filePath = path.join(repetitiveFolderPath, `${repetitive.id}.json`);
        const fileData = JSON.stringify(newRepetitive);
        fs.writeFileSync(filePath, fileData, "utf8");
        return newRepetitive;
    } catch (error) {
        throw {code: "failedToUpdateRepetitive", message: error.message};
    }
}

// Method to remove a repetitive from a file
function remove(repetitiveId) {
    try {
        const filePath = path.join(repetitiveFolderPath, `${repetitiveId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch (error) {
        if (error.code === "ENOENT") {
            return {};
        }
        throw {code: "failedToRemoveRepetitive", message: error.message};
    }
}

// Method to board repetitives in a folder
function list() {
    try {
        const files = fs.readdirSync(repetitiveFolderPath);
        const repetitiveList = files.map((file) => {
            const fileData = fs.readFileSync(path.join(repetitiveFolderPath, file), "utf8");
            return JSON.parse(fileData);
        });
        return repetitiveList;
    } catch (error) {
        throw {code: "failedToListRepetitives", message: error.message};
    }
}

function isListSharedWith(list, repetitiveId) {
    return list.sharedWith.some(sharedRepetitive => sharedRepetitive.repetitiveId === repetitiveId);
}

module.exports = {
    get,
    create,
    update,
    remove,
    list,
};
