const response = (res, code, data, msg) => {
    res.status(200).json({
        code,
        data: data || {},
        msg
    });
};

const ok = (res) => {
    response(res, 0, {}, '操作成功');
};

const okWithMessage = (res, message) => {
    response(res, 0, {}, message);
};

const okWithData = (res, data) => {
    response(res, 0, data, '成功');
};

const okWithDetailed = (res, data, message) => {
    response(res, 0, data, message);
};

const fail = (res) => {
    response(res, 7, {}, '操作失败');
};

const failWithMessage = (res, message) => {
    response(res, 7, {}, message);
};

module.exports = {
    response,
    ok,
    okWithMessage,
    okWithData,
    okWithDetailed,
    fail,
    failWithMessage
};