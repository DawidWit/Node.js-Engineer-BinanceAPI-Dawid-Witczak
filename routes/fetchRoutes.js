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
    //!req.params.startDate || !req.params.endDate ||
    /* if (!req.params.symbol) {
         return res.status(400).send({ msg: 'NO REQUIRED PARAMS' });
     }*/

    try {
        const currentPrice = await fetchCurrentSymbol('BTCUSDT');
        console.log(currentPrice);
        const result = await axios.get(`${process.env.BINANCE_BASE_STR}/klines`, {
            params: {
                symbol: 'BTCUSDT',
                interval: '3d',
                //startDate: new Date("2025-03-25").getTime(),
                //endDate: new Date("2015-03-29").getTime()
            }
        });
        console.log(result);
    } catch (error) {
        console.error('ERROR FETCHING HISTORICAL SYMBOL DATA: ', error.res?.data?.msg || error.message);
        return res.status(500).send({ msg: `ERROR FETCHING HISTORICAL SYMBOL DATA:  ${error.res?.data?.msg || error.message}` });
    }
});

module.exports = router;