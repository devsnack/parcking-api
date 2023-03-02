const {
  getModefrais,
  getRebriqueFrais_hrmin,
  getRebriqueFrais_hrmax,
  getRebriqueFrais_km,
  getRebriqueFrais_all,
} = require("./utils/fees");
const moment = require("moment");

async function calculDejeuner(data, mode) {
  console.log("entred");
  let dateD, dateR;
  let nbDejeuner;
  let heureD, heureR;
  let vDistance;
  let vMontantUnitDejeuner;
  //let vMode_Frais;

  let { Mode: vMode_Frais } = await getModefrais(mode);

  vDistance = data.distance;
  dateD = data.dated[0];
  dateR = data.dater[0];
  heureD = data.dated[1];
  heureR = data.dater[1];
  nbDejeuner = 0;
  vMontantUnitDejeuner = 0;
  let line = {};

  //
  var a = moment(dateR.split("/").reverse().map(Number));
  var b = moment(dateD.split("/").reverse().map(Number));
  //var a = moment(newValue).toArray().slice(0, 3);
  //console.log(moment(b).diff(a, "days"));
  // 1
  nbDejeuner = a.diff(b, "days");
  console.log(nbDejeuner);

  //nbreDejeuner = DateDiff(dateR, dateD);

  //
  if (nbDejeuner > 0) {
    nbDejeuner = nbDejeuner - 1;
    /*`select * from Rubrique_Frais where Mode = ${vMode_Frais} 
 and Rubrique='DEJEUNER' and Hrs_Min>= ${HeureD}  and KM_MIN <= ${vDistance}
and KM_MAX >=${vDistance}`;*/
    let getRebriqueFrais = await getRebriqueFrais_hrmin(vMode_Frais, {
      heureD,
      vDistance,
    });
    console.log(getRebriqueFrais);
    if (getRebriqueFrais.length > 0) {
      nbDejeuner = nbDejeuner + 1;
      line = getRebriqueFrais[0];
      vMontantUnitDejeuner = line["Montant"];
    }

    /*`select * from Rubrique_Frais where Mode = ${vMode_Frais} 
    and Rubrique='DEJEUNER' and Hrs_Max<= ${HeureR}  and KM_MIN <= ${vDistance}
   and KM_MAX >=${vDistance}`;*/
    getRebriqueFrais = await getRebriqueFrais_hrmax(vMode_Frais, {
      heureR,
      vDistance,
    });
    console.log(getRebriqueFrais);
    if (getRebriqueFrais.length > 0) {
      nbDejeuner = nbDejeuner + 1;
      line = getRebriqueFrais[0];
      vMontantUnitDejeuner = line["Montant"];
    } else {
      /*` select * from Rubrique_Frais where Mode= vMode_Frais
        and Rubrique='DEJEUNER' and KM_MIN <= vDistance and KM_MAX >= vDistance `;*/
      getRebriqueFrais = await getRebriqueFrais_km(
        vMode_Frais,
        { vDistance },
        "DEJEUNER"
      );
      console.log(getRebriqueFrais);
      if (getRebriqueFrais.length > 0) {
        line = getRebriqueFrais[0];
        vMontantUnitDejeuner = line("Montant");
      }
    }
  } else {
    /* `select * from Rubrique_Frais where Mode=vMode_Frais 
    and Rubrique=DEJEUNER and Hrs_Min>=HeureD  and Hrs_Max<= HeureR 
    and KM_MIN <= vDistance and KM_MAX >= vDistance `;*/
    getRebriqueFrais = await getRebriqueFrais_all(vMode_Frais, {
      heureD,
      heureR,
      vDistance,
    });
    console.log(getRebriqueFrais);
    if (getRebriqueFrais.length > 0) {
      nbDejeuner = nbDejeuner + 1;

      line = getRebriqueFrais[0];
      vMontantUnitDejeuner = line["Montant"];
    } else {
      nbDejeuner = 0;
      vMontantUnitDejeuner = 0;
    }
  }
  if (nbDejeuner <= 0) {
    nbDejeuner = 0;
    vMontantUnitDejeuner = 0;
  }
  /*text_montant_unit_dejeuner = vMontantUnitDejeuner;
  text_nbre_dejeuner = nbDejeuner;

  if ((text_nbredej_npc = 0)) {
    text_nbredej_npc = nbreDejeuner;
  }
  text_nbre_dejeuner;*/
  return { nbDejeuner, vMontantUnitDejeuner };
}

module.exports = {
  calculDejeuner,
};
