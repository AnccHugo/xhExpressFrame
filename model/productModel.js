const fs = require('fs');
const path = require('path');
const nodeXlsx = require('node-xlsx');
const config = require('../config/config');
const BaseModel = require('./baseModel');


const __PRODUCT_FILE_PATH__ = path.join(__dirname, '../config/product.xls');
const __PRODUCT_CELLS_JSON_PATH__ = path.join(config.dataPath, '/cells.json');


/** 初始化该控制器 start */
(() => {
  console.info('======>', '初始化 ProductModel Start', '======>');

  const productFile = fs.readFileSync(__PRODUCT_FILE_PATH__);

  const productTable = nodeXlsx.parse(productFile);

  let cellsSheet = null;
  cellsSheet = productTable.map(ele => {
    if (ele.name === '细胞系') { return ele; }
  })[0];

  let cellsJson = {};
  if (cellsSheet && cellsSheet.data) {
    cellsJson.title = cellsSheet.data.shift();
    cellsJson.data = cellsSheet.data;
    cellsJson.createTime = Date.now();
    cellsJson.updateTime = Date.now();

    if (cellsJson && cellsJson.title && cellsJson.data) {
      fs.writeFileSync(__PRODUCT_CELLS_JSON_PATH__, JSON.stringify(cellsJson));
      console.info('->', '初始化细胞系表成功！');
    }
  }

  console.info('======>', '初始化 ProductModel Ended', '======>');
})();
/** 初始化该控制器 end */


class ProductModel extends BaseModel {
  constructor(props) { super(props); }

  GetCells = async () => {
    if(!fs.existsSync(__PRODUCT_CELLS_JSON_PATH__)){
      return this.errorReturn('CELLS_FILE_NOT_FOUND');
    }

    const cellsJson = JSON.parse(fs.readFileSync(__PRODUCT_CELLS_JSON_PATH__));
    if(cellsJson){
      return this.successReturn('', {cellsJson});
    }

    return this.errorReturn('CELLS_GET_FAIL');
  };

}

const productModel = new ProductModel();

module.exports = productModel;