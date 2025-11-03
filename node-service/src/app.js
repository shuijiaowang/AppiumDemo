require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const routes = require('./routes');
const corsMiddleware = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');
const { sequelize } = require('./models');
const {initCronJobs} = require("./cronJobs");
const { initMiddleware } = require('./middleware'); // 新增
const PORT = process.env.PORT || 7789;

const app = express();

// 中间件
initMiddleware(app); // 中间件注册


app.use(express.json());
// 路由
app.use(routes);
// 错误处理中间件
app.use(errorHandler);

// 同步数据库模型并启动服务
sequelize.sync({ alter: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`服务已启动，监听端口 ${PORT}`);
            initCronJobs(); // 初始化定时任务
        });
    })
    .catch(err => {
        console.error('数据库同步失败:', err);
    });