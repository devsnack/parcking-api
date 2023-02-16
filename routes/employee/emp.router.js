const express = require("express");

const route = express.Router();

const { addEmp, getAllEmp, updateEmp, deleteEmp } = require("./emp.conroller");

route.post("/add", addEmp);
route.get("/allemp", getAllEmp);
route.put("/editEmp/:id", updateEmp);
route.delete("/deleteEmp/:id", deleteEmp);

module.exports = route;
