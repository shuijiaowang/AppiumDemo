// src/middleware/index.js
const express = require('express');
const corsMiddleware = require('./cors');

const initMiddleware = (app) => {
    app.use(express.json());
    app.use(corsMiddleware);
    // 未来新增中间件可在此添加
};

module.exports = { initMiddleware };