const offerDao = require("./offer-dao.js");
const requestDao = require("./request-dao.js");

const fs = require("fs");
const path = require("path");


const offerFolderPath = path.join(__dirname, "storage", "offerList");
const requestFolderPath = path.join(__dirname, "storage", "requestList");


function list(type) {
  let folderPath;
  if (type === "offer") {
    folderPath = offerFolderPath;
  } else if (type === "request") {
    folderPath = requestFolderPath;
  } else {
    throw new Error("Invalid type specified");
  }

  try {
  
    const files = fs.readdirSync(folderPath);

   
    const objectList = files.map((file) => {
      
      const objectData = file.replace(".json", "").split("_");
      return {
        name: objectData[0],
        email: objectData[1],
        //date: objectData[2],
        file,
      };
    });

    return objectList;
  } catch (error) {
    
    throw { code: "failedToListObjects", message: error.message };
  }
}

function getAll() {
  try {
    const offerList = offerDao.list();
    const requestList = requestDao.list();
    return {
      offers: offerList,
      requests: requestList
    };
  } catch (error) {
    throw { code: "failedToGetAllObjects", message: error.message };
  }
}

module.exports = {
  getAll,
};
