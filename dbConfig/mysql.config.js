var mysql = require("mysql");

var mysqlConnection = null;
var mysqlConfig = {};

mysqlConfig.connectToMySQLDB = async (connectionOptions) => {
    try {
        mysqlConnection = mysql.createConnection({
            host: connectionOptions.host,
            port: connectionOptions.port,
            user: connectionOptions.user,
            password: connectionOptions.pass,
            database: connectionOptions.dbName
        });

        mysqlConnection.connect(function (err) {
            if (err) {
                console.error(`MySQL DB -> connection error on ${connectionOptions.host}:${connectionOptions.port} details->${err}`);
                process.exit(-1);
            }
            else {
                console.log(`------------------------------------------------------------------`);
                console.log(`MySQL DB -> connection established on ${connectionOptions.host}:${connectionOptions.port} with ID : ${mysqlConnection.threadId}`);
                console.log(`------------------------------------------------------------------`);
            }
        });

    }
    catch (e) {
        console.error(`MySQL DB -> connection error on ${connectionOptions.host}:${connectionOptions.port} details->${e}`);
        process.exit(-1);
    }
}

mysqlConfig.getMySqlDBConnection = () => {
    return mysqlConnection;
}

module.exports = mysqlConfig;
