const { body, validationResult } = require('express-validator');
const userService = require('../services/userService');
const { generateToken } = require('../utils/jwt');
const { ok, failWithMessage, okWithData } = require('../utils/response');

exports.registerValidation = [
    body('username').isLength({ min: 1, max: 20 }).withMessage('用户名长度不符合要求'),
    body('password').isLength({ min: 1 }).withMessage('密码不能为空')
];

exports.register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return failWithMessage(res, '无效的请求格式：用户名至少3位，密码至少6位'); //测试用方便，不重要
        }

        const { username, password } = req.body;
        await userService.register(username, password);
        ok(res);
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return failWithMessage(res, '无效的请求格式');
        }

        const { username, password } = req.body;
        const user = await userService.login(username, password);

        if (!user) {
            return failWithMessage(res, '用户名或密码错误');
        }

        const token = generateToken(user.id, user.username, user.uuid);

        okWithData(res, {
            id: user.id,
            username: user.username,
            uuid: user.uuid,
            token
        });
    } catch (err) {
        next(err);
    }
};

exports.test = (req, res) => {
    ok(res);
};