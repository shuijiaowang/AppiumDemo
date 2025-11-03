const sequelize = require('../config/db');
const User = require('./user');
const Example = require('./example');

// 关联模型（如果有）

module.exports = {
    sequelize,
    User,
    Example
};