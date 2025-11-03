const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: '用户名'
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '加密密码'
    },
    uuid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        unique: true,
        comment: '用户唯一标识UUID'
    }
});

module.exports = User;