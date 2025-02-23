const express = require('express');
const router = express.Router();

const transactions = require('./transactions');

router.use('/', transactions);

module.exports = router;
