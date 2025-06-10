const connectDB = require('./config/db');
const express = require('express');
const fetchRoutes = require('./routes/fetchRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/api/data', fetchRoutes);

app.listen(PORT, () => {
    console.log("LISTENING ON PORT:", PORT);
})