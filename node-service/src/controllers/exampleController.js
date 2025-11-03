const { body, validationResult } = require('express-validator');
const exampleService = require('../services/exampleService');
const { getUserInfo } = require('../utils/jwt');
const { okWithData, failWithMessage } = require('../utils/response');

exports.test = async (req, res, next) => {
    try {
        const userInfo = getUserInfo(req);
        console.log('获取登陆用户解析token的信息:', userInfo);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return failWithMessage(res, errors.array()[0].msg);
        }

        const str = exampleService.addExample();
        okWithData(res, str);
    } catch (err) {
        next(err);
    }
};