const express = require("express");
const multer = require("multer");
const http = require("http");
const path = require("path");
const fs = require("fs");

const route = express.Router();

route.post("/add", (req, res) => {});

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};
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

route.post("/upload", upload.single("avatar"), (req, res) => {
  //const { vname, immat, lch, nserie } = req.body;
  const { file } = req;
  const data = ({ vname, immat, lch, compteur, nserie, datea } = req.body);
  // parse chauffeur license
  data.file = file.filename;
  console.log(data);

  res.status(200).send({ status: "ok" });
  // console.log(req.file);
  //console.log(req.body.data.vname);
});
module.exports = route;
