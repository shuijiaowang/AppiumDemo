const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class UserService {
    async register(username, password) {
        // 检查用户名是否已存在
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            throw { isAppError: true, code: 7, message: '用户名已存在' };
        }

        // 生成UUID
        const userUUID = uuidv4();

        // 密码加密
        const hashedPassword = await bcrypt.hash(password, 10);

        // 创建用户
        const user = await User.create({
            username,
            password: hashedPassword,
            uuid: userUUID
        });

        if (!user) {
            throw { isAppError: true, code: 7, message: '注册失败，请重试' };
        }

        return user;
    }

    async login(username, password) {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return null;
        }

        // 验证密码
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }

        return user;
    }
}

module.exports = new UserService();