const express = require('express');

class BaseController extends express {
    constructor(props) {
      super(props);
    }

    errorReturn = async(res, msg = '', data = {}) => {
        res.send({ success: false, msg, data });
    };

    successReturn = async(res, msg = '', data = {}) => {
        res.send({ success: true, msg, data });
    };
}





module.exports = BaseController;