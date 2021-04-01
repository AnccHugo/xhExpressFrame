class BaseController {
    constructor() {

    }

    errorReturn = async(res, msg = '', data = {}) => {
        res.send({ success: false, msg, data });
    };

    successReturn = async(res, msg = '', data = {}) => {
        res.send({ success: true, msg, data });
    };
}





module.exports = BaseController;