// src/routes/index.js
const express = require('express');
const userRoutes = require('./userRoutes');
const exampleRoutes = require('./exampleRoutes');
const { jwtInterceptor } = require('../middleware/jwt');

const router = express.Router();

// 无需鉴权的路由
router.use('/api/user', userRoutes);

// 需要鉴权的路由
const apiRouter = express.Router();
apiRouter.use(jwtInterceptor);
apiRouter.use('/example', exampleRoutes);
router.use('/api', apiRouter);

module.exports = router;