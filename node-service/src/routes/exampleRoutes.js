// src/routes/exampleRoutes.js
const express = require('express');
const exampleController = require('../controllers/exampleController');
const router = express.Router();

router.post('/test', exampleController.test);

module.exports = router;