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
        let output = [];
        if (result.data.length > 0) {
            for (data of result.data) {
                const high = `${(data[2] / currentPrice * 100).toFixed(2)}%`;
                const low = `${(data[3] / currentPrice * 100).toFixed(2)}%`;
                const resStr = `From ${new Date(data[0]).toDateString()} to ${new Date(data[6]).toDateString()}, the lowest price  was ${low} of current price, and the highest was ${high} of the current price`;
                output.push(resStr);
                console.log(resStr);
            }
        }
        return res.status(200).send({ success: true, data: output });
    } catch (error) {
        console.error('ERROR FETCHING HISTORICAL SYMBOL DATA: ', error.res?.data?.msg || error.message);
        return res.status(500).send({ success: false, msg: `ERROR FETCHING HISTORICAL SYMBOL DATA:  ${error.res?.data?.msg || error.message}` });
    }
});

module.exports = router;