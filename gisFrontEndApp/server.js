const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const Router = require("./routes");

dotenv.config({path: './config/config.env'});
const app = express();
const PORT = process.env.PORT || 2999;

// Body parser
app.use(express.json());
// Enabling CORS
app.use(cors());

app.use(Router);

app.listen(PORT, () =>
  console.log(`Front end server is running in ${process.env.NODE_ENV} mode at port ${PORT}`)
);
