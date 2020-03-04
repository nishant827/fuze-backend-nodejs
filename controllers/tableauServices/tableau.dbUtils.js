const mysqlController = require("../../dbConfig/mysql.controller");
const config = require("../../configurations/config");

var tableNames = {
    PO_REQUEST_TABLE: config.MYSQL_CONFIG.DB_TABLES.PO_REQUEST_TABLE_NAME
};

var tableauDbUtils = {};

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

tableauDbUtils.insertBulkTableauData = (bulkData) => {
    return new Promise((resolve, reject) => {
        try {
            let data = bulkData;
            if (data) {
                resolve({});
            }
            else {
                data = [];
                let siteNames = ["EAST BRADELY", "MONROE STATION", "MARMADUKE AR", "BOSTONIA", "NW HIGH POINT", "WEST BRADELY"];
                for (let i = 0; i < siteNames.length; i++) {
                    let tableauResponse = getTableauResponse(siteNames[i]);
                    data = data.concat(tableauResponse);
                    data.push(tableauResponse);
                    if (i == siteNames.length - 1) {
                        // console.log(`Tableau response : ${JSON.stringify(tableauResponse, null, 2)}`);
                        resolve({});
                    }
                }
            }
        }
        catch (e) {
            console.error(`Error catched while inserting bulk : ${e}`);
            reject(e);
        }
    })
}

function getTableauResponse(siteName) {
    let poStatus = ["Other/Unkown", "Cancelled", "Deleted", "Pending Approval", "Open", "Draft"];
    let response = [];
    for (let i = 0; i < poStatus.length; i++) {
        let responseObj = {
            siteName: siteName,
            numberOfPORequests: Math.floor(Math.random() * (25 * (i + 1))),
            poStatus: poStatus[i],
            totalPOAmount: Math.random() * 100000
        };
        responseObj.totalPOAmount = +responseObj.totalPOAmount.toFixed(2);
        response.push(responseObj);
        if (i == poStatus.length - 1) {
            return response;
        }
    }
}

module.exports = tableauDbUtils;