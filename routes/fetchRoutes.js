const { default: axios } = require('axios');
const express = require('express');
const fetchCurrentSymbol = require('../service/dataService');
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {

    if (!process.env.BINANCE_BASE_STR) {
        console.error('NO BINANCE BASE PROVIDED');
        return res.status(500).send({ msg: 'NO BINANCE BASE PROVIDED' });
    }
    /*if (!req.params.startDate || !req.params.endDate || !req.params.symbol) {
        return res.status(400).send({ msg: 'NO REQUIRED PARAMS' });
    }*/

    try {
        const currentPrice = await fetchCurrentSymbol('BTCUSDT');
        const result = await axios.get(`${process.env.BINANCE_BASE_STR}/klines`, {
            params: {
                symbol: 'BTCUSDT',
                interval: '1w',
            }
        });
        console.log(result);
    } catch (error) {
        console.error('ERROR FETCHING HISTORICAL SYMBOL DATA: ', error.res?.data?.msg || error.message);
        return res.status(500).send({ msg: `ERROR FETCHING HISTORICAL SYMBOL DATA:  ${error.res?.data?.msg || error.message}` });
    }
});

module.exports = router;