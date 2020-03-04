const mysqlController = require("../../dbConfig/mysql.controller");
const config = require("../../configurations/config");

var tableNames = {
    PO_REQUEST_TABLE: config.MYSQL_CONFIG.DB_TABLES.PO_REQUEST_TABLE_NAME
};

var tableauDbUtils = {};

/**
 * getPORequestDataForTableau method returns the list of PO Request grouping by sitename with count respective to PO Status
 * @author Nishant Singh Gawer
 * @version 1.0
*/
tableauDbUtils.getPORequestDataForTableau = () => {
    return new Promise((resolve, reject) => {
        try {
            let poRequestDataForTableauQuery = `SELECT site_name,
            po_status, total_po_amount, count(*) as numberOfPORequests 
            FROM ${tableNames.PO_REQUEST_TABLE} group by site_name, po_status;`;
            mysqlController.queryToMySqlDB(poRequestDataForTableauQuery).then((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched in tableauDbUtils.getPORequestDataForTableau method : ${e}`);
            reject(e);
        }
    });
}

/**
 * insertOneTableauData method saves a record to MySQL db in the po_request table
 * @param tableauData: record values in json like site name and po status
 * @author Nishant Singh Gawer
 * @version 1.0
*/
tableauDbUtils.insertOneTableauData = (tableauData) => {
    return new Promise((resolve, reject) => {
        try {
            let insertQuery = `INSERT INTO ${tableNames.PO_REQUEST_TABLE} 
            (site_name, po_status, total_po_amount) 
            VALUES ('${tableauData.siteName}','${tableauData.poStatus}',${Math.ceil(Math.random() * 100000)})`;
            mysqlController.queryToMySqlDB(insertQuery).then((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched in tableauDbUtils.insertOneTableauData method : ${e}`);
            reject(e);
        }
    });
}

module.exports = tableauDbUtils;