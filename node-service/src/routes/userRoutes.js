// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.registerValidation, userController.register);
router.get('/test', userController.test);

module.exports = router;