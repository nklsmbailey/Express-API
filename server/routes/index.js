const express = require('express');
const chirpRouter = require('./chirps');

let router = express.Router();

router.use('/chirps', chirpsRouter);

module.exports = router;