const BaseController = require('./baseController');
const productModel = require('../model/productModel');
const { reset } = require('nodemon');


class ProductController extends BaseController {
  constructor(props) { super(props); }

  GetCells = async (req, res) => {
    const getResult = await productModel.GetCells(req.body);
    if (getResult && getResult.success) {
      return this.successReturn(res, getResult.msg || "", getResult.data || {});
    }

    this.errorReturn(res, getResult.msg || "", getResult.data || {});
  };

  GetCell = async (req, res) => {
    const { cellUuid } = req.body;
    if (!cellUuid) {
      return this.errorReturn(res, 'PARAMS_LACK');
    }

    const getResult = await productModel.GetCell({ cellUuid });
    if (getResult && getResult.success) {
      return this.successReturn(res, getResult.msg || "", getResult.data || {});
    }

    this.errorReturn(res, getResult.msg || "", getResult.data || {});
  };

}

const productController = new ProductController();

module.exports = productController;