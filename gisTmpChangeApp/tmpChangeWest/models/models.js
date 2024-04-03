const mongoose = require("mongoose");

const YearRecordSchema = new mongoose.Schema({
  State: {
    type: String,
    required: true,
    },
  Year: {
    type: Number,
    required: true,
    default: 1900,
    },
  Jan: {
    type: Number,
    required: false,
  },
  Feb: {
    type: Number,
    required: false,
  },
  Mar: {
    type: Number,
    required: false,
  },
  Apr: {
    type: Number,
    required: false,
  },
  May: {
    type: Number,
    required: false,
  },
  Jun: {
    type: Number,
    required: false,
  },
  Jul: {
    type: Number,
    required: false,
  },
  Aug: {
    type: Number,
    required: false,
  },
  Sep: {
    type: Number,
    required: false,
  },
  Nov: {
    type: Number,
    required: false,
  },
  Dec: {
    type: Number,
    required: false,
  },
  Annual: {
    type: Number,
    required: true,
  }
},
{collection: 'TmpRecordsWest'})

module.exports.TmpRecords = mongoose.model("TmpRecordsWest", YearRecordSchema);
