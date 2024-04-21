const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const requestFolderPath = path.join(__dirname, "storage", "requestList");

// Method to read an request from a file
function get(requestId) {
  try {
    const filePath = path.join(requestFolderPath, `${requestId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadRequest", message: error.message };
  }
}

// Method to write an request to a file
function create(request) {
  try {
    request.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(requestFolderPath, `${request.id}.json`);
    const fileData = JSON.stringify(request);
    fs.writeFileSync(filePath, fileData, "utf8");
    return request;
  } catch (error) {
    throw { code: "failedToCreateRequest", message: error.message };
  }
}

// Method to update request in a file
function update(request) {
  try {
    const currentRequest = get(request.id);
    if (!currentRequest) return null;
    const newRequest = { ...currentRequest, ...request };
    const filePath = path.join(requestFolderPath, `${request.id}.json`);
    const fileData = JSON.stringify(newRequest);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newRequest;
  } catch (error) {
    throw { code: "failedToUpdateRequest", message: error.message };
  }
}

// Method to remove an request from a file
function remove(requestId) {
  try {
    const filePath = path.join(requestFolderPath, `${requestId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveRequest", message: error.message };
  }
}

// Method to list request in a folder
function list() {
  try {
    const files = fs.readdirSync(requestFolderPath);
    const requestList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(requestFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return requestList;
  } catch (error) {
    throw { code: "failedToListRequest", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list
};