const express = require("express");

const route = express.Router();

const { addCh, getAllCh, updateCh, deleteCh } = require("./ch.controller");

route.post("/add", addCh);
route.get("/allch", getAllCh);
route.put("/editch/:id", updateCh);
route.delete("/deletech/:id", deleteCh);

module.exports = route;
