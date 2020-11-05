const router = require("express").Router();
const fs = require('fs');
const path = require("path");
const express = require("express");

router.route("/").get((req, res) => {

    res.sendFile(path.join(__dirname, 'products.json'));

});

module.exports = router;