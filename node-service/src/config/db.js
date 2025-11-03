const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        define: {
            timestamps: true,
            underscored: true,
            paranoid: true // 软删除
        }
    }
);

// 测试连接
sequelize.authenticate()
    .then(() => console.log('数据库连接成功'))
    .catch(err => {
            console.error('数据库连接失败:', err)
            console.log('数据库配置,都是undefined，读取失败:', {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            dbName: process.env.DB_NAME
        });
        }
    );

module.exports = sequelize;