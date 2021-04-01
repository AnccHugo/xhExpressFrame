const config = require('../config/config');
const BaseController = require('./baseController');
const userModel = require('../model/userModel');


class UserController extends BaseController {
    constructor(props) {
        super(props);
    }

    login = async(req, res) => {
        let { email, password } = req.body;

        if (!email || !password) {
            return this.errorReturn(res, 'PARAMS_LACK');
        }

        const loginResult = await userModel.login({ email, password });
        if (loginResult.success) {
            return this.successReturn(res, loginResult.msg || 'USER_LOGIN_SUCCESS', loginResult.data || {});
        }

        return this.errorReturn(res, loginResult.msg || 'USER_LOGIN_FAIL', loginResult.data || {});
    };

    registe = async(req, res) => {
        let { email, password, verifyCode } = req.body;

        if (!email || !password || !verifyCode) {
            return this.errorReturn(res, 'PARAMS_LACK');
        }

        const registeResult = await userModel.registe({ email, password, verifyCode });
        if (registeResult.success) {
            return this.successReturn(res, registeResult.msg || 'USER_REGISTE_SUCCESS', registeResult.data || {});
        }

        return this.errorReturn(res, registeResult.msg || 'USER_REGISTE_FAIL', registeResult.data || {});
    };

    sendVerifyCode = async(req, res) => {
        let { email } = req.body;

        if (!email) {
            return this.errorReturn(res, 'PARAMS_LACK');
        }

        const sendResult = await userModel.sendVerifyCode({ email });
        if (sendResult.success) {
            return this.successReturn(res, sendResult.msg || 'USER_REGISTE_SUCCESS', sendResult.data || {});
        }

        return this.errorReturn(res, sendResult.msg || 'USER_VERIFY_CODE_SEND_FAIL', sendResult.data || {});
    };
}

const userController = new UserController();

module.exports = userController;