const express = require("express");

const route = express.Router();

const {
  getItn,
  addMession,
  updateEmp,
  deleteEmp,
  getavailablevoitures,
  calculFraisM,
} = require("./mession.controller");

route.get("/getitn", getItn);
route.post("/checkavailablevoitures", getavailablevoitures);
route.post("/addmession", addMession);
route.get("/calculfees/:id", calculFraisM);
route.put("/editmession/:id", updateEmp);
route.delete("/deletemession/:id", deleteEmp);

module.exports = route;
