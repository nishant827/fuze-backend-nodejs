module.exports = {
    APPP_CONFIG: {
        PORT: process.env.APP_PORT || 4040,
        HOST: process.env.APP_HOST || "localhost"
    },
    MYSQL_CONFIG: {
        DB_NAME: process.env.MYSQL_DB_NAME || "fuze_db",
        DB_HOST: process.env.MYSQL_DB_HOST || "localhost",
        DB_USER: process.env.MYSQL_DB_USER || "root",
        DB_PASS: process.env.MYSQL_DB_PASS || "root",
        DB_PORT: process.env.MYSQL_DB_PORT || "3306",
        DB_TABLES: {
            PO_REQUEST_TABLE_NAME: process.env.PO_REQUEST_TABLE_NAME || "po_request"
        }
    },

}