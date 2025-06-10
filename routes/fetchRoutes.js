const { default: axios } = require('axios');
const express = require('express');
const fetchCurrentSymbol = require('../service/dataService');
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
    if (!process.env.BINANCE_BASE_STR) {
        console.error('NO BINANCE BASE PROVIDED');
        return res.status(500).send({ success: false, msg: 'NO BINANCE BASE PROVIDED' });
    }
    if (!req.query.startTime || !req.query.endTime || !req.query.symbol) {
        return res.status(400).send({ success: false, msg: 'NO REQUIRED PARAMS' });
    }
    try {
        const currentPrice = await fetchCurrentSymbol(req.query.symbol);
        const result = await axios.get(`${process.env.BINANCE_BASE_STR}/klines`, {
            params: {
                symbol: req.query.symbol,
                interval: '3d',
                startTime: req.query.startTime,
                endTime: req.query.endTime
            }
        });

        if (result.data.length > 0) {
            for (data of result.data) {
                const high = 1 - (currentPrice / data[2]) * 100;
                console.log(high);
                const low = 1 - (currentPrice / data[3]) * 100;
                console.log(low);
            }
        }
        return res.status(200).send();
    } catch (error) {
        console.error('ERROR FETCHING HISTORICAL SYMBOL DATA: ', error.res?.data?.msg || error.message);
        return res.status(500).send({ success: false, msg: `ERROR FETCHING HISTORICAL SYMBOL DATA:  ${error.res?.data?.msg || error.message}` });
    }
});

module.exports = router;