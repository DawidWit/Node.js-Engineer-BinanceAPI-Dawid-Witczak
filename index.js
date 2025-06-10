const connectDB = require('./config/db');
const express = require('express');
const fetchRoutes = require('./routes/fetchRoutes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/historicalData', fetchRoutes);

app.listen(PORT, () => {
    console.log("LISTENING ON PORT:", PORT);
})