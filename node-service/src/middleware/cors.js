const cors = require('cors');

const corsMiddleware = cors({
    origin: (origin, callback) => {
        callback(null, origin || '*');
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept'],
    exposedHeaders: ['Content-Length', 'Access-Control-Allow-Origin', 'X-Token'],
    credentials: true
});

module.exports = corsMiddleware;