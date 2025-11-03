const { response } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
    console.error('错误:', err);

    // 处理已知错误
    if (err.isAppError) {
        return response(res, err.code, null, err.message);
    }

    // 处理未知错误
    response(res, 500, null, '服务器内部错误');
};

module.exports = errorHandler;