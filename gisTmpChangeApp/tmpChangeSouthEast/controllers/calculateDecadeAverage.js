function calculateDecadeAverage(records, month) {
  // console.log("records within calculateDecadeAverage", records);
  var state = records[0].State;
  var decade = records[0].Year;
// Below could be changed to an array to add in more months e.g. summer months = {Jun, Jul, Aug} ...
  var month = "Aug";
  var totalTmp = 0;
  for (record in records) {
    let jsonObj = records[record]
    totalTmp =  totalTmp + Number(records[record].Aug);
  }

  var decadeAverage = totalTmp / records.length;
  // console.log("Decade Average is: ", decadeAverage);

  return decadeAverage
}
exports.calculateDecadeAverage = calculateDecadeAverage;

function checkMonthIsValid(month) {
  console.log("month provided as parameter 2: ", month)
  const validMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  if (validMonths.includes(month)) {
    return true
  } else {
    return false
  }
}
exports.checkMonthIsValid = checkMonthIsValid;
