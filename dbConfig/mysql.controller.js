const mysqlConfig = require("./mysql.config");

var mysqlController = {};

/**
 * queryToMySqlDB is a method to query to perform operations at DB
 * @param query: DB query to be fired to the Database
 * @author Nishant Singh Gawer
 * @version 1.0
*/
mysqlController.queryToMySqlDB = (query) => {
    return new Promise((resolve, reject) => {
        try {
            let mysqlConnection = mysqlConfig.getMySqlDBConnection();
            mysqlConnection.query(query, (error, result, fields) => {
                if (error) {
                    console.error(`Error while querying to DB : ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }
        catch (e) {
            console.error(`Error catched in mysqlController.query method : ${e}`);
            reject(e);
        }
    });
}

module.exports = mysqlController;
