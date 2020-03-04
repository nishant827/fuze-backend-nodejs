const express = require("express");
const router = express.Router();

router.use("/api", require("./tableauServices/tableau.services"));

module.exports = router;