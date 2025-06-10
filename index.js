const express = require('express');
const fetchRoutes = require('./routes/fetchRoutes');
const bodyParser = require('body-parser');

//Initializing express.js app with port
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Route for analysis
app.use('/api/historicalData', fetchRoutes);

app.listen(PORT, () => {
    console.log("LISTENING ON PORT:", PORT);
})