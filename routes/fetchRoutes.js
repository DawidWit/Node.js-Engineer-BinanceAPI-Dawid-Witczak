const { default: axios } = require('axios');
const express = require('express');
const fetchCurrentSymbol = require('../service/dataService');
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
    console.log(req.query);
    if (!process.env.BINANCE_BASE_STR) {
        console.error('NO BINANCE BASE PROVIDED');
        return res.status(500).send({ msg: 'NO BINANCE BASE PROVIDED' });
    }
    if (!req.query.startDate || !req.query.endDate || !req.query.symbol) {
        return res.status(400).send({ msg: 'NO REQUIRED PARAMS' });
    }
    console.log(new Date("2025-05-15").getTime());
    console.log(new Date("2015-05-29").getTime());
    try {
        const currentPrice = await fetchCurrentSymbol('BTCUSDT');
        const result = await axios.get(`${process.env.BINANCE_BASE_STR}/klines`, {
            params: {
                symbol: 'BTCUSDT',
                interval: '3d',
                startTime: new Date("2025-05-15").getTime(),
                endTime: new Date("2015-05-29").getTime()
            }
        });
        console.log(result.data);
    } catch (error) {
        console.error('ERROR FETCHING HISTORICAL SYMBOL DATA: ', error.res?.data?.msg || error.message);
        return res.status(500).send({ msg: `ERROR FETCHING HISTORICAL SYMBOL DATA:  ${error.res?.data?.msg || error.message}` });
    }
});

module.exports = router;