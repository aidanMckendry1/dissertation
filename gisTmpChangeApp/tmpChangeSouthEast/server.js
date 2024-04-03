const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const Router = require("./routes");

dotenv.config({path: './config/config.env'});
const app = express();
const PORT = process.env.PORT || 3003;

// Body parser
app.use(express.json());
// Enabling CORS
app.use(cors());

const options = {
  autoIndex: false,
  reconnectTries: 10,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0
}

// can a .env file be created to use (process.env.NODE_ENV) to connect to mongodb either on local address or container address.. ??
// https://stackoverflow.com/questions/21987311/check-is-nodejs-connection-come-from-localhost - check this
const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  // for running app locally - connect to "mongodb://127.0.0.1:37017/test"
  // for connecting app when running on container - 'mongodb://mongodb:27017/test'
  const databaseAddress = 'mongodb://mongodb-south-east:27017/test'
  mongoose.connect(databaseAddress).then(()=>{
    console.log('Connected successfully')
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names);
        module.exports.Collection = names; // exports all collection names (states) stored in this database
    });
  }).catch(err=>{
    console.error.bind(console, "Connection Error: ");
    console.log('MongoDB connection unsuccessful for address: ' + databaseAddress + ', retrying in 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}
connectWithRetry()


app.use(Router);

app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} mode at port ${PORT}`)
);
