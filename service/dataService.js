require('dotenv').config();
const axios = require('axios');

//Fetches current price for symbol
fetchCurrentSymbol = async (symbol) => {
    try {
        const result = await axios.get(`${process.env.BINANCE_BASE_STR}/ticker/price`, {
            params: {
                symbol
            }
        });
        return parseFloat(result.data.price);
    } catch (error) {
        console.error('ERROR FETCHING CURRENT SYMBOL PRICE: ', error.res?.data?.msg || error.message);
        return null;
    }
}

module.exports = fetchCurrentSymbol;