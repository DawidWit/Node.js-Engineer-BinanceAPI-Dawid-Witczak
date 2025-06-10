require('dotenv').config();
const axios = require('axios');

//CONNECTS MONGODB DATABASE TO APPLICATION 
fetchCurrentSymbol = async (symbol) => {
    console.log(process.env.BINANCE_BASE_STR);
    try {
        const result = await axios.get(`${process.env.BINANCE_BASE_STR}/ticker/price`, {
            params: {
                symbol
            }
        });
        return parseFloat(result.price);
    } catch (error) {
        console.error('ERROR FETCHING CURRENT SYMBOL PRICE: ', error.res?.data?.msg || error.message);
        return null;
    }
}

module.exports = fetchCurrentSymbol;