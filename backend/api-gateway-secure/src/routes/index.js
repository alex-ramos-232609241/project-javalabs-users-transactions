const express = require('express');
const users = require('../users/routes');
const transactions = require('../transactions/routes');
const router = express.Router();

router.use('/users', users);
router.use('/transactions',  transactions);

module.exports = router;
