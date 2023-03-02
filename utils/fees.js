const { client } = require("../services/mongo");
let db = client.db("cartana").collection("rubriques_frais");
let db2 = client.db("cartana").collection("mode_frais");

async function getModefrais(mode) {
  let result = await db2.find({ Mode: mode }).toArray();
  return result[0];
}

async function getRebriqueFrais_hrmin(vmode, data) {
  console.log("hrmin");
  let result = await db
    .find({
      $and: [
        { Mode: vmode },
        { Rubrique: "DEJEUNER" },
        { Hrs_Min: { $gte: data.heureD } },
        { $expr: { $lte: [{ $toInt: "$KM_MIN" }, parseInt(data.vDistance)] } },
        { $expr: { $gte: [{ $toInt: "$KM_MAX" }, parseInt(data.vDistance)] } },
        // { KM_MIN: { $lte: data.vDistance } },
        //{ KM_MAX: { $gte: data.vDistance } },
      ],
    })
    .toArray();
  return result;
}

async function getRebriqueFrais_hrmax(vmode, data) {
  console.log("hrmax");
  let result = await db
    .find({
      $and: [
        { Mode: vmode },
        { Rubrique: "DEJEUNER" },
        { Hrs_Max: { $lte: data.heureR } },
        { $expr: { $lte: [{ $toInt: "$KM_MIN" }, parseInt(data.vDistance)] } },
        { $expr: { $gte: [{ $toInt: "$KM_MAX" }, parseInt(data.vDistance)] } },
        //  { KM_MIN: { $lte: data.vDistance } },
        //{ KM_MAX: { $gte: data.vDistance } },
      ],
    })
    .toArray();
  return result;
}

async function getRebriqueFrais_km(vmode, data, rubrique) {
  console.log("km");
  let result = await db
    .find({
      $and: [
        { Mode: vmode },
        { Rubrique: rubrique },
        { $expr: { $lte: [{ $toInt: "$KM_MIN" }, parseInt(data.vDistance)] } },
        { $expr: { $gte: [{ $toInt: "$KM_MAX" }, parseInt(data.vDistance)] } },
        //  { KM_MIN: { $lte: data.vDistance } },
        // { KM_MAX: { $gte: data.vDistance } },
      ],
    })
    .toArray();
  return result;
}

async function getRebriqueFrais_all(vmode, data) {
  let result = await db
    .find({
      $and: [
        { Mode: vmode },
        { Rubrique: "DEJEUNER" },

        { Hrs_Min: { $gte: data.heureD } },
        { Hrs_Max: { $lte: data.heureR } },
        //{ KM_MIN: { $lte: data.vDistance } },
        //  { KM_MAX: { $gte: data.vDistance } },
        { $expr: { $lte: [{ $toInt: "$KM_MIN" }, parseInt(data.vDistance)] } },
        { $expr: { $gte: [{ $toInt: "$KM_MAX" }, parseInt(data.vDistance)] } },
      ],
    })
    .toArray();
  console.log(vmode, data);

  return result;
}

////////// DINNER
async function getRebriqueFrais_hrmin_dinner(vmode, data) {
  console.log(data);
  console.log("hrmin_dinner");
  let result = await db
    .find({
      $and: [
        { Mode: vmode },
        { Rubrique: "DINER" },
        { Hrs_Min: { $lte: data.heureR } },
        { $expr: { $lte: [{ $toInt: "$KM_MIN" }, parseInt(data.vDistance)] } },
        { $expr: { $gte: [{ $toInt: "$KM_MAX" }, parseInt(data.vDistance)] } },
        // { KM_MIN: { $lte: data.vDistance } },
        //{ KM_MAX: { $gte: data.vDistance } },
      ],
    })
    .toArray();
  return result;
}

////

module.exports = {
  getModefrais,
  getRebriqueFrais_hrmin,
  getRebriqueFrais_hrmax,
  getRebriqueFrais_km,
  getRebriqueFrais_all,
  getRebriqueFrais_hrmin_dinner,
};
