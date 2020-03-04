var mysql = require("mysql");

var mysqlConnection = null;
var mysqlConfig = {};

/**
 * connectToMySQLDB is a method to connect with MySQL DB by providing the connection options
 * @param connectionOptions: connection values in json like host, port,username,password and the database name
 * @author Nishant Singh Gawer
 * @version 1.0
*/
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

/**
 * getMySqlDBConnection method returns a MySQL connection object 
 * @author Nishant Singh Gawer
 * @version 1.0
*/
mysqlConfig.getMySqlDBConnection = () => {
    return mysqlConnection;
}

module.exports = mysqlConfig;
