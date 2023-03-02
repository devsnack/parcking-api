function check_in(D_1, D_2, D_3) {
  D_1 = D_1.split("/");
  D_2 = D_2.split("/");
  D_3 = D_3.split("/"); // want to check

  var d1 = new Date(D_1[2], parseInt(D_1[1]) - 1, D_1[0]);
  var d2 = new Date(D_2[2], parseInt(D_2[1]) - 1, D_2[0]);
  var d3 = new Date(D_3[2], parseInt(D_3[1]) - 1, D_3[0]);
  console.log(d1, d2, d3);
  if (d3 >= d1 && d3 <= d2) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  check_in,
};
