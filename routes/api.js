const express = require("express");
const api = express.Router();

// START ROUTE
const employee = require("./employee/emp.router");
const chauffeur = require("./chauffeur/ch.router");
const car = require("./cars/cars.router");
const mession = require("./mession/mession.router");

const upload = require("./upload");

// DEFAULT API ENDPOINT
api.get("/", (req, res) => {
  res.send({ message: "ajouter avec success" });
});
api.use("/emp", employee);
api.use("/ch", chauffeur);
api.use("/cr", car);
api.use("/mession", mession);
api.use("/file", upload);

//api.use("/planets", planetsRouter);
//api.use("/launches", launchesRouter);

module.exports = api;
