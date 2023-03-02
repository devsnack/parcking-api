const {
  getModefrais,

  getRebriqueFrais_km,

  getRebriqueFrais_hrmin_dinner,
} = require("./utils/fees");
const moment = require("moment");

async function calculDiner(data, mode) {
  let dateD, dateR;
  let nbrediner;
  let heureD, heureR;
  let vDistance;
  let vMontantUnitDiner;
  let getRebriqueFrais;
  //let vMode_Frais;

  let { Mode: vMode_Frais } = await getModefrais(mode);

  vDistance = data.distance;
  dateD = data.dated[0];
  dateR = data.dater[0];
  heureD = data.dated[1];
  heureR = data.dater[1];

  let Line = {};

  //
  var a = moment(dateR.split("/").reverse().map(Number));
  var b = moment(dateD.split("/").reverse().map(Number));
  //var a = moment(newValue).toArray().slice(0, 3);
  //console.log(moment(b).diff(a, "days"));
  // 1
  let NbreDiner = a.diff(b, "days");
  console.log(NbreDiner);

  if (NbreDiner < 0) {
    NbreDiner = 0;
    vMontantUnitDiner = 0;
  } else {
    /*"select * from Rubrique_Frais where Mode='" &
    vMode_Frais &
    "' and Rubrique='DINER' and Hrs_Min <='" &
    HeureR &
    "' and KM_MIN <=" &
    vDistance &
    " and KM_MAX >=" &
    vDistance &
    "";*/
    getRebriqueFrais = await getRebriqueFrais_hrmin_dinner(mode, {
      heureR,
      vDistance,
    });
    console.log(getRebriqueFrais.length);
    if (getRebriqueFrais.length > 0) {
      NbreDiner = NbreDiner + 1;
      Line = getRebriqueFrais[0];
      vMontantUnitDiner = Line["Montant"];
    } else {
      /** "select * from Rubrique_Frais where Mode='" &
        vMode_Frais &
        "' and Rubrique='DINER' and KM_MIN <=" &
        vDistance &
        " and KM_MAX >=" &
        vDistance &
        ""; */
      getRebriqueFrais = await getRebriqueFrais_km(
        vMode_Frais,
        { vDistance },
        "DINER"
      );
      console.log(getRebriqueFrais.length);
      if (getRebriqueFrais.length > 0) {
        Line = getRebriqueFrais[0];
        vMontantUnitDiner = Line["Montant"];
      }
    }
  }

  if (NbreDiner <= 0) {
    NbreDiner = 0;
    vMontantUnitDiner = 0;
  }

  return { NbreDiner, vMontantUnitDiner };

  /*Montant_Unit_DINERTextBox.Text = vMontantUnitDiner;
  Montant_Unit_DINERTextBox.Text = Format(
    CDec(Montant_Unit_DINERTextBox.Text),
    "#, ##0.00"
  );
  Nbre_DINERTextBox.Text = NbreDiner;

  if ((Nb_Din_NPECTextBox.Text = 0)) {
    Nb_Din_PECTextBox.Text = NbreDiner;
  }

  Nbre_DINERTextBox.Text = Format(CDec(Nbre_DINERTextBox.Text), "#, ##0.00");
  Nb_Din_PECTextBox.Text = Format(CDec(Nb_Din_PECTextBox.Text), "#, ##0.00");
  Nb_Din_NPECTextBox.Text = Format(CDec(Nb_Din_NPECTextBox.Text), "#, ##0.00");*/
}

module.exports = {
  calculDiner,
};
