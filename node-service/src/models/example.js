const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Example = sequelize.define('Example', {
    // 可以根据需要添加字段
});

module.exports = Example;