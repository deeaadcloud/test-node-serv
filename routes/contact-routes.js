const express = require("express");
const {getContact} = require('../controller/contact-controller')
const router = express.Router();
const createPath = require('../helpers/create-path')

router.get("/contacts",  getContact);

module.exports = router;
