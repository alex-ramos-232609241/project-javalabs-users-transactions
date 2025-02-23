    const express = require('express');
    const router = express.Router()

    const {
        listTransactionsUser,
        saveTransactions,
    } = require('../controllers');

    router.get('/:user_id', async (req, res) => {
        res.send(await listTransactionsUser(req))
    })
    router.post('/', async (req, res) => {
        res.send(await saveTransactions(req))
    })

    module.exports = router;

