const BaseController = require('./baseController');
const productModel = require('../model/productModel');
const { reset } = require('nodemon');


class ProductController extends BaseController {
  constructor(props) { super(props); }

  GetCells = async (req, res) => {
    const getResult = await productModel.GetCells();
    if (getResult && getResult.success) {
      return this.successReturn(res, getResult.msg || "CELLS_GET_SUCCESS", getResult.data || {});
    }

    this.errorReturn(res, getResult.msg || "CELLS_GET_FAIL", getResult.data || {});
  };

}

const productController = new ProductController();

module.exports = productController;