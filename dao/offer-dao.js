const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const offerFolderPath = path.join(__dirname, "storage", "offerList");

// Method to read an offer from a file
function get(offerId) {
  try {
    const filePath = path.join(offerFolderPath, `${offerId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadOffer", message: error.message };
  }
}

// Method to write an offer to a file
function create(offer) {
  try {
    offer.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(offerFolderPath, `${offer.id}.json`);
    const fileData = JSON.stringify(offer);
    fs.writeFileSync(filePath, fileData, "utf8");
    return offer;
  } catch (error) {
    throw { code: "failedToCreateOffer", message: error.message };
  }
}

// Method to update offer in a file
function update(offer) {
  try {
    const currentOffer = get(offer.id);
    if (!currentOffer) return null;
    const newOffer = { ...currentOffer, ...offer };
    const filePath = path.join(offerFolderPath, `${offer.id}.json`);
    const fileData = JSON.stringify(newOffer);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newOffer;
  } catch (error) {
    throw { code: "failedToUpdateOffer", message: error.message };
  }
}

// Method to remove an offer from a file
function remove(offerId) {
  try {
    const filePath = path.join(offerFolderPath, `${offerId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveOffer", message: error.message };
  }
}

// Method to list offers in a folder
function list() {
  try {
    const files = fs.readdirSync(offerFolderPath);
    const offerList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(offerFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return offerList;
  } catch (error) {
    throw { code: "failedToListOffers", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list
};