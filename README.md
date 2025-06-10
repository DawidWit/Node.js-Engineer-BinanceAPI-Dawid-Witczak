# Node.js-Engineer-BinanceAPI-Dawid-Witczak

##SETUP
1. Create .env file with:
BINANCE_BASE_STR - base string of binance(https://api.binance.com/api/v3)
2. Install dependencies:
```bash 
npm install
```
3. Run the application:
```bash
npm run dev
```
4. API endpoints:
GET /api/historicalData - returns price analysis from specific start time to end time for a specific symbol
REQUIRED PARAMS:
symbol - string, a symbol of cryptocurrency
startTime - integer, a start date of time range
endTime - integer, a end date of time range