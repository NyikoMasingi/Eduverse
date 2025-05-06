const express = require('express');
const router = express.Router();
const {uploadMaterial} = require('../controller/material.controller');

router.post('/new', uploadMaterial);



module.exports = router;
