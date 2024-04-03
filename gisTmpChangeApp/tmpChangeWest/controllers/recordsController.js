const mongoose = require('mongoose');
const calculateDecadeAverage = require('./calculateDecadeAverage');
var { TmpRecords } = require('../models/models');
var { Collection } = require('../server');
var _ = require("underscore");

// @description GET single records
// @route GET /api/v1/records/:year || GET /api/v1/records?year=value
// @access Public
exports.getRecord = async (req, res, next) => {
  let { year } = req.query;
  let query = {};
  if (year) query.year = year

  try {
    const tmprecords = await TmpRecords.find({Year: { $eq: year}});
    return res.status(200).json({
      success: true,
      count: tmprecords.length,
      data: tmprecords
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Server error occurred for year: ' + year
    });
  }
};
// @description GET tmp changes for all states by decade decades
// @route GET /api/v1/tmpChanges
// @access Public
exports.getTmpChanges = async (req, res, next) => {
  let { month } = req.query;
  console.log("month provided as parameter: ", month)
  if (!calculateDecadeAverage.checkMonthIsValid(month)) {
    return res.status(400).json({
      success: false,
      error: "Invalid month given as parameter"
    });
  }

  var stateList = ["California", "Oregan", "Washington", "Alaska", "Colorado", "Nevada", "Idaho", "Utah", "Montana", "Wyoming"];
  var query = {};

  var decadesToCalculate = [1910, 1920, 1940, 1950, 1960, 1970, 1980, 1990 , 2000, 2010];
  var endOfDecadesToCalculate = [1920, 1940, 1950, 1960, 1970, 1980, 1990 , 2000, 2010, 2020];
  var jsonResponseData = [];
  try {
    // loop for calculating each states temperature change by decade
    for (state in stateList) {
      // add parameter for date range in calculations ... instead of just decade 5 year & 20 year date span options
      // will need check on oldest records returned, if response is empty, search for next date range
      const oldestStateRecords = await TmpRecords.find({ Year : { $gte :  1900, $lt : 1910}, State: [stateList[state]], [month]:{$type: 1}});
      console.log("records being passed to calculate method", oldestStateRecords);
      var oldestAverage = calculateDecadeAverage.calculateDecadeAverage(oldestStateRecords, month);

      for (decade in decadesToCalculate) {
        query[month] = {$type: 1}; // filters out missing records - not of type double
        query["State"] = stateList[state]; // filters query by correct to correct state only
        query["Year"] = { $gte : decadesToCalculate[decade], $lt : endOfDecadesToCalculate[decade]}; // filters query by decade range
        var decadeTmpRecords = await TmpRecords.find(query);

        decadeAverageTmp = calculateDecadeAverage.calculateDecadeAverage(decadeTmpRecords, month);
        tmpChange = decadeAverageTmp - oldestAverage;

        let tmpChangeToJson = {'temperaturechange': tmpChange, 'state': stateList[state], 'decade': decadesToCalculate[decade]};
        // console.log(tmpChangeToJson)
        jsonResponseData = jsonResponseData.concat(tmpChangeToJson);
        // console.log(jsonResponseData);
      }
    }
    //const jsonContent = JSON.stringify(jsonResponseData);
    return res.status(200).json({
      success: true,
      count: jsonResponseData.length,
      data: jsonResponseData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Server error occurred'
    });
  }
};

// @description GET all records
// @route GET /api/v1/records
// @access Public
exports.getRecords = async (req, res, next) => {

  try {
    const tmprecords = await TmpRecords.find({});
    return res.status(200).json({
      success: true,
      count: tmprecords.length,
      data: tmprecords
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Server error occurred'
    });
  }
};
