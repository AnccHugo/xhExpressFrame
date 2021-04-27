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

  GetNiayozhu = async (req, res) => {
    const getResult = await productModel.GetNaiyaozhu(req.body);
    if (getResult && getResult.success) {
      return this.successReturn(res, getResult.msg || "", getResult.data || {});
    }

    this.errorReturn(res, getResult.msg || "", getResult.data || {});
  };

  GetYuandaixibao = async (req, res) => {
    const getResult = await productModel.GetYuandaixibao(req.body);
    if (getResult && getResult.success) {
      return this.successReturn(res, getResult.msg || "", getResult.data || {});
    }

    this.errorReturn(res, getResult.msg || "", getResult.data || {});
  };

  GetCas9 = async (req, res) => {
    const getResult = await productModel.GetCas9(req.body);
    if (getResult && getResult.success) {
      return this.successReturn(res, getResult.msg || "", getResult.data || {});
    }

    this.errorReturn(res, getResult.msg || "", getResult.data || {});
  };

  GetCRISPRi = async (req, res) => {
    const getResult = await productModel.GetCRISPRi(req.body);
    if (getResult && getResult.success) {
      return this.successReturn(res, getResult.msg || "", getResult.data || {});
    }

    this.errorReturn(res, getResult.msg || "", getResult.data || {});
  };

  GetLuc1 = async (req, res) => {
    const getResult = await productModel.GetLuc1(req.body);
    if (getResult && getResult.success) {
      return this.successReturn(res, getResult.msg || "", getResult.data || {});
    }

    this.errorReturn(res, getResult.msg || "", getResult.data || {});
  };

  GetLuc2 = async (req, res) => {
    const getResult = await productModel.GetLuc2(req.body);
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