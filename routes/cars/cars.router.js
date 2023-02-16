const express = require("express");
const multer = require("multer");
const route = express.Router();

const { addCr, getAllCr, updateCr, deleteCr } = require("./cars.controller");

// multer to upload files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //console.log(file);
    cb(null, file.originalname.split(".")[0].toLowerCase() + ".png");
  },
});
const upload = multer({ storage: storage });
//

route.post("/add", upload.single("avatar"), addCr);
route.get("/allcars", getAllCr);
route.put("/editcar/:id", updateCr);
route.delete("/deletecar/:id", deleteCr);

module.exports = route;
