const mongoose = require('mongoose');
require('dotenv').config();

//CONNECTS MONGODB DATABASE TO APPLICATION 
connectDB = async () => {
    try {
        const dbConn = mongoose.connect(process.env.MONGO_CONN_STR);
        console.log("MONGODB CONNECTED");
        return dbConn;
    } catch (error) {
        console.error('MONGODB CONNECTION ERROR: ', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;