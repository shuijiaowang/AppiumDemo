// src/cronJobs/index.js
const cron = require('node-cron');

const initCronJobs = () => {
    // 每10秒执行一次
    cron.schedule('*/10 * * * * *', () => {
        console.log(`测试任务执行：当前时间 ${new Date().toLocaleString()}`);
    });

    // 每30秒执行一次
    cron.schedule('*/30 * * * * *', () => {
        console.log('测试任务2执行：这是30秒一次的日志');
    });
};

module.exports = { initCronJobs };