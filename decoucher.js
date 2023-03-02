const {
  getModefrais,

  getRebriqueFrais_hrmin_dinner,
  getRebriqueFrais_km,
} = require("./utils/fees");
const moment = require("moment");

async function calculDecoucher(data, mode) {
  let dateD, dateR;
  let nbreDecoucher, nbreJours;
  let heureD, heureR;
  let vDistance;
  let vMontantUnitDecoucher;
  let vProportionnel;
  let vProportion;
  let heureMin;
  let heureMax;
  //let vMode_Frais;

  nbreDecoucher = 0;
  vMontantUnitDecoucher = 0;
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
  nbreJours = a.diff(b, "days");

  nbreDecoucher = nbreJours;
  console.log(nbreDecoucher);

  if (nbreDecoucher > 0) {
    nbreDecoucher = nbreDecoucher - 1;
  }

  let getRebriqueFrais = await getRebriqueFrais_km(
    mode,
    { vDistance },
    "DECOUCHER"
  );

  /*"select * from Rubrique_Frais where Mode='" &
    vMode_Frais &
    "' and Rubrique='DECOUCHER' and KM_MIN <=" &
    vDistance &
    " and KM_MAX >=" &
    vDistance &
    "";*/

  if (getRebriqueFrais.length > 0) {
    Line = getRebriqueFrais[0];
    vMontantUnitDecoucher = Line["Montant"];
    vProportionnel = Line["Proportionnel"];
    heureMin = Line["Hrs_Min"];
    heureMax = Line["Hrs_Max"];
    if (nbreJours > 0) {
      if (heureD <= heureMax) {
        vProportion =
          (moment(heureMax, "HH:mm").hour() - Hour(heureD)) /
          (Hour(heureMax) - Hour(heureMin));
        nbreDecoucher = nbreDecoucher + vProportion;
      }
      //
      if (heureR >= heureMax) {
        nbreDecoucher = nbreDecoucher + 1;
      } else {
        vProportion =
          (hour(heureR) - hour(heureMin)) / (hour(heureMax) - hour(heureMin));
        nbreDecoucher = nbreDecoucher + vProportion;
      }
    } else {
      if (heureR >= heureMax) {
        vProportion =
          (Hour(heureMax) - Hour(heureD)) / (Hour(heureMax) - Hour(heureMin));
      } else {
        vProportion =
          (Hour(heureR) - Hour(heureD)) / (Hour(heureMax) - Hour(heureMin));
      }

      nbreDecoucher = nbreDecoucher + vProportion;
    }
  } else {
    nbreDecoucher = 0;
    vMontantUnitDecoucher = 0;
  }

  if (nbreDecoucher <= 0) {
    nbreDecoucher = 0;
    vMontantUnitDecoucher = 0;
  }

  Montant_Unit_DECOUCHERTextBox.Text = vMontantUnitDecoucher;
  Montant_Unit_DECOUCHERTextBox.Text = Format(
    CDec(Montant_Unit_DECOUCHERTextBox.Text),
    "#, ##0.00"
  );
  Nbre_DECOUCHERTextBox.Text = NbreDecoucher;

  if (Nb_Dec_NPECTextBox.Text == 0) {
    Nb_Dec_PECTextBox.Text = NbreDecoucher;
  }

  Nbre_DECOUCHERTextBox.Text = Format(
    CDec(Nbre_DECOUCHERTextBox.Text),
    "#, ##0.00"
  );
  Nb_Dec_PECTextBox.Text = Format(CDec(Nb_Dec_PECTextBox.Text), "#, ##0.00");
  Nb_Dec_NPECTextBox.Text = Format(CDec(Nb_Dec_NPECTextBox.Text), "#, ##0.00");
}
