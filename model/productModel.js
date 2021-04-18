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
    cellsJson.data = [];
    cellsJson.title.unshift('uuid');
    cellsSheet.data.map((value, index) => {
      if (value && value.length > 0) {
        value.unshift(index + 1);
        cellsJson.data.push(value);
      }
    });
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

  GetCells = async ({ keyword = null }) => {
    const regMatch = new RegExp(keyword, 'g');
    const strReplace = `<strong>${keyword}</strong>`;

    const getResult = _GetCellsJson();
    if (getResult && getResult.success && getResult.data) {
      let cells = Object.assign({}, getResult.data);
      cells.data = [];

      console.log(keyword);
      if (keyword) {
        for (let [index, value] of Object.entries(getResult.data.data)) {
          let isMatch = false;

          for (let [idx, val] of Object.entries(value)) {
            if (!val) { break; }

            val = new String(val);

            value[idx] = val.replace(regMatch, strReplace);

            if (val && regMatch.test(val) && !isMatch) {
              isMatch = true;
            }
          }

          if (isMatch) { cells.data.push(value); }
        }

        return this.successReturn(getResult.msg || '', { cellsJson: cells || {} });
      }

      return this.successReturn(getResult.msg || '', { cellsJson: getResult.data || {} });
    }

    return this.errorReturn(getResult.msg || 'CELLS_GET_FAIL', getResult.data || {});
  };

  GetCell = async ({ cellUuid }) => {
    if (!cellUuid) {
      return this.errorReturn('PARAMS_LACK');
    }

    const getResult = _GetCellsJson();
    if (getResult && getResult.success && getResult.data && getResult.data.title && getResult.data.data) {
      let titleIndex = null, cell = { title: getResult.data.title };

      for (const [index, value] of getResult.data.title.entries()) {
        if (value === 'uuid') { titleIndex = index; break; }
      }

      for (const [index, value] of getResult.data.data.entries()) {
        if (value[titleIndex] && value[titleIndex] == cellUuid) { cell.data = value; break; }
      }

      return this.successReturn(getResult.msg || '', { cell });
    }

    return this.errorReturn('CELL_GET_FAIL', getResult.data || {});
  };
}

function _GetCellsJson() {
  if (!fs.existsSync(__PRODUCT_CELLS_JSON_PATH__)) {
    return { success: false, msg: 'CELLS_FILE_NOT_FOUND' };
  }

  const cellsJson = JSON.parse(fs.readFileSync(__PRODUCT_CELLS_JSON_PATH__));
  if (cellsJson) {
    return { success: true, msg: 'CELLS_GET_SUCCESS', data: cellsJson };
  }

  return { success: false, msg: 'CELLS_GET_FAIL' };
}

const productModel = new ProductModel();

module.exports = productModel;