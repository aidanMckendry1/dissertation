const express = require("express");
const { getRecords } = require('./controllers/recordsController');
const { getRecord } = require('./controllers/recordsController');
const { getTmpChanges } = require('./controllers/recordsController');
var router = express.Router();

router.route('/api/v1/records').get( getRecords );
router.route('/api/v1/record').get( getRecord );
router.route('/api/v1/tmpChanges').get( getTmpChanges );

//  below section to be moved to gateway app

// exports all endpoints in this file
module.exports = router;
