const jwt = require('jsonwebtoken');
const { response } = require('../utils/response');

const JWT_SECRET = process.env.JWT_SECRET;

const jwtInterceptor = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return response(res, 7, null, '未提供token');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return response(res, 7, null, 'token格式错误');
    }

    try {
        const decoded = jwt.verify(parts[1], JWT_SECRET);
        req.claims = decoded;
        next();
    } catch (err) {
        return response(res, 7, null, '无效的token');
    }
};

module.exports = { jwtInterceptor };