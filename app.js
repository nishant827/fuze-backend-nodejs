require('dotenv').config(); // to take config values from environment variables
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const config = require("./configurations/config");
const mySqlConfig = require("./dbConfig/mysql.config");
const app = express();

(async () => {
    let mysqlConnectionOptions = { host: config.MYSQL_CONFIG.DB_HOST, port: config.MYSQL_CONFIG.DB_PORT, user: config.MYSQL_CONFIG.DB_USER, pass: config.MYSQL_CONFIG.DB_PASS, dbName: config.MYSQL_CONFIG.DB_NAME };
    // console.log(`mysqlConnectionOptions : ${JSON.stringify(mysqlConnectionOptions, null, 2)}`);
    await mySqlConfig.connectToMySQLDB(mysqlConnectionOptions);

    app.use(cors());
    app.use(bodyParser.json()); // to respond back in json format

    /* Default api */
    app.get('/', (req, res) => {
        let todaysDate = new Date();
        console.log(`${req.headers.host} Hit GET / API at time-stamp : ${todaysDate.toLocaleDateString()} | ${todaysDate.toLocaleTimeString()}`);
        res.send(`<h2> Welcome to FUZE Backend Services! </h2>`);
    });

    // Injecting all API's via express router
    app.use(require('./controllers'));

    app.listen(config.APPP_CONFIG.PORT, () => {
        console.log(`APP running on PORT : ${config.APPP_CONFIG.PORT}`);
    });

})();