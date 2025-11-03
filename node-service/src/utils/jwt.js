const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

const generateToken = (userId, username, userUUID) => {
    return jwt.sign(
        {
            id: userId,
            username,
            uuid: userUUID
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

const parseToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};

const getUserInfo = (req) => {
    return req.claims;
};

module.exports = {
    generateToken,
    parseToken,
    getUserInfo
};