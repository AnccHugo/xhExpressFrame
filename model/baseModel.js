class BaseModel {
    errorReturn = async(msg = '', data = {}) => {
        return { success: false, msg, data };
    };

    successReturn = async(msg = '', data = {}) => {
        return { success: true, msg, data };
    };
}


module.exports = BaseModel;