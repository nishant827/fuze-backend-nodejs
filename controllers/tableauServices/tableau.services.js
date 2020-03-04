const express = require("express");
const router = express.Router();
const tableauDbUtils = require("./tableau.dbUtils");

router.get("/tableauData", (req, res) => {
    let todaysDate = new Date();
    console.log(`${req.headers.host} Hit POST /tableauData API at time-stamp : ${todaysDate.toLocaleDateString()} | ${todaysDate.toLocaleTimeString()}`);
    tableauDbUtils.getPORequestDataForTableau().then((result) => {
        res.send({ status: true, result: { data: result } });
    }, (error) => {
        res.status(500).send({ status: false, result: { error: error } });
    });

});


router.post("/saveTableauData", (req, res) => {
    let todaysDate = new Date();
    console.log(`${req.headers.host} Hit POST /saveTableauData API at time-stamp : ${todaysDate.toLocaleDateString()} | ${todaysDate.toLocaleTimeString()}`);
    if (req.body && req.body.tableauData && req.body.tableauData.siteName && req.body.tableauData.poStatus) {
        tableauDbUtils.insertOneTableauData(req.body.tableauData).then((result) => {
            res.send({ status: true, result: { data: result } });
        }, (error) => {
            res.status(500).send({ status: false, result: { error: error } });
        });
    }
    else {
        res.status(422).send({ status: false, result: { message: `Missing required fields in body.!` } });
    }
});

module.exports = router;
