const fs = require('fs');
const path = require('path');
const nodeXlsx = require('node-xlsx');
const config = require('../config/config');
const BaseModel = require('./baseModel');


const __PRODUCT_FILE_PATH__ = path.join(__dirname, '../config/product.xls');
const __PRODUCT_CELLS_JSON_PATH__ = path.join(config.dataPath, '/cells.json');
const __PRODUCT_NAIYAOZHU_JSON_PATH__ = path.join(config.dataPath, '/naiyaozhu.json');
const __PRODUCT_YUANDAOXIBAO_JSON_PATH__ = path.join(config.dataPath, '/yuandaixibao.json');
const __PRODUCT_CAS9_JSON_PATH__ = path.join(config.dataPath, '/Cas9.json');
const __PRODUCT_CRISPRi_JSON_PATH__ = path.join(config.dataPath, '/CRISPRi.json');
const __PRODUCT_LUC1_JSON_PATH__ = path.join(config.dataPath, '/LUC1.json');
const __PRODUCT_LUC2_JSON_PATH__ = path.join(config.dataPath, '/LUC2.json');


/** 初始化该控制器 start */
(() => {
  console.info('======>', '初始化 ProductModel Start', '======>');

  const productFile = fs.readFileSync(__PRODUCT_FILE_PATH__);

  const productTable = nodeXlsx.parse(productFile);

  _InitCellsTable(productTable);

  _InitNaiyaozhuTable(productTable);

  _InitYuandaiXibaoTable(productTable);

  _InitCas9Table(productTable);

  _InitCRISPRiTable(productTable);

  _InitLUC1Table(productTable);

  _InitLUC2Table(productTable);

  console.info('======>', '初始化 ProductModel Ended', '======>');
})();
/** 初始化该控制器 end */


class ProductModel extends BaseModel {
  constructor(props) { super(props); }

  GetCells = async ({ keyword = null }) => {
    const getResult = _GetCellsJson();
    if (!getResult || !getResult.success) {
      return this.errorReturn(getResult.msg || "", getResult.data || {});
    }

    if (!keyword) { return this.successReturn(getResult.msg || '', { cellsJson: getResult.data || {} }); }

    let cellList = null;
    const regMatch = new RegExp(keyword, 'g');
    const strReplace = `<strong>${keyword}</strong>`;

    if (getResult.data && getResult.data.data) { cellList = getResult.data.data; }

    if (cellList && cellList.length) {
      let nameEN_idx = 2, nameCN_idx = 1, product_Idx = 4;
      let cells = { title: getResult.data.title, data: [] };

      let cellNameEN = [];
      let cellNameCN = [];
      let cellProduct = [];
      let cellElse = [];
      for (let [cellIndex, cellItem] of Object.entries(cellList)) {
        cellItem[nameEN_idx] = new String(cellItem[nameEN_idx]);
        cellItem[nameCN_idx] = new String(cellItem[nameCN_idx]);
        cellItem[product_Idx] = new String(cellItem[product_Idx]);

        if (regMatch.test(cellItem[nameEN_idx])) {
          cellItem[nameEN_idx] = cellItem[nameEN_idx].replace(regMatch, strReplace);
          cellNameEN.push(cellItem);
          continue;
        }

        if (regMatch.test(cellItem[nameCN_idx])) {
          cellItem[nameCN_idx] = cellItem[nameCN_idx].replace(regMatch, strReplace);
          cellNameCN.push(cellItem);
          continue;
        }

        if (regMatch.test(cellItem[product_Idx])) {
          cellItem[product_Idx] = cellItem[product_Idx].replace(regMatch, strReplace);
          cellProduct.push(cellItem);
          continue;
        }

        if (regMatch.test(cellItem[cellIndex])) {
          cellItem[cellIndex] = cellItem[cellIndex].replace(regMatch, strReplace);
          cellElse.push(cellItem);
          continue;
        }
      }

      cells.data = [...cellNameEN, ...cellNameCN, ...cellProduct, ...cellElse];

      if (cells.data && cells.data.length) {

        return this.successReturn(getResult.msg || '', { cellsJson: cells || {} });
      }
    }

    return this.errorReturn(getResult.msg || 'CELLS_GET_FAIL', getResult.data || {});
  };

  GetNaiyaozhu = async ({ keyword = null }) => {
    const getResult = _GetDataJson(__PRODUCT_NAIYAOZHU_JSON_PATH__);
    if (!getResult || !getResult.success) {
      return this.errorReturn(getResult.msg || "", getResult.data || {});
    }

    if (!keyword) { return this.successReturn(getResult.msg || '', { dataJson: getResult.data || {} }); }

    return this.errorReturn(getResult.msg || 'DATA_GET_FAIL', getResult.data || {});
  };

  GetYuandaixibao = async ({ keyword = null }) => {
    const getResult = _GetDataJson(__PRODUCT_YUANDAOXIBAO_JSON_PATH__);
    if (!getResult || !getResult.success) {
      return this.errorReturn(getResult.msg || "", getResult.data || {});
    }

    if (!keyword) { return this.successReturn(getResult.msg || '', { dataJson: getResult.data || {} }); }

    return this.errorReturn(getResult.msg || 'DATA_GET_FAIL', getResult.data || {});
  };

  GetCas9 = async ({ keyword = null }) => {
    const getResult = _GetDataJson(__PRODUCT_CAS9_JSON_PATH__);
    if (!getResult || !getResult.success) {
      return this.errorReturn(getResult.msg || "", getResult.data || {});
    }

    if (!keyword) { return this.successReturn(getResult.msg || '', { dataJson: getResult.data || {} }); }

    return this.errorReturn(getResult.msg || 'DATA_GET_FAIL', getResult.data || {});
  };

  GetCRISPRi = async ({ keyword = null }) => {
    const getResult = _GetDataJson(_InitCRISPRiTable);
    if (!getResult || !getResult.success) {
      return this.errorReturn(getResult.msg || "", getResult.data || {});
    }

    if (!keyword) { return this.successReturn(getResult.msg || '', { dataJson: getResult.data || {} }); }

    return this.errorReturn(getResult.msg || 'DATA_GET_FAIL', getResult.data || {});
  };

  GetLuc1 = async ({ keyword = null }) => {
    const getResult = _GetDataJson(__PRODUCT_LUC1_JSON_PATH__);
    if (!getResult || !getResult.success) {
      return this.errorReturn(getResult.msg || "", getResult.data || {});
    }

    if (!keyword) { return this.successReturn(getResult.msg || '', { dataJson: getResult.data || {} }); }

    return this.errorReturn(getResult.msg || 'DATA_GET_FAIL', getResult.data || {});
  };

  GetLuc2 = async ({ keyword = null }) => {
    const getResult = _GetDataJson(__PRODUCT_LUC2_JSON_PATH__);
    if (!getResult || !getResult.success) {
      return this.errorReturn(getResult.msg || "", getResult.data || {});
    }

    if (!keyword) { return this.successReturn(getResult.msg || '', { dataJson: getResult.data || {} }); }

    return this.errorReturn(getResult.msg || 'DATA_GET_FAIL', getResult.data || {});
  };

  GetCell = async ({ cellUuid }) => {
    if (!cellUuid) {
      return this.errorReturn('PARAMS_LACK');
    }

    const getResult = _GetCellsJson();
    if (getResult && getResult.success && getResult.data && getResult.data.title && getResult.data.data) {
      let titleIndex = null,
        cell = { title: getResult.data.title };

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



// 初始化数据表
function _InitCellsTable(productTable) {
  let sheet = null;
  sheet = productTable.map(ele => {
    if (ele.name === '细胞系') { return ele; }
  })[0];

  if (!sheet || !sheet.data) { return console.warn('初始化表失败！' + '细胞系'); }

  let dataJson = {};
  if (sheet && sheet.data) {
    dataJson.title = sheet.data.shift();
    dataJson.data = [];
    dataJson.title.unshift('uuid');
    sheet.data.map((value, index) => {
      if (value && value.length > 0) {
        value.unshift(index + 1);
        dataJson.data.push(value);
      }
    });
    dataJson.createTime = Date.now();
    dataJson.updateTime = Date.now();

    if (dataJson && dataJson.title && dataJson.data) {
      fs.writeFileSync(__PRODUCT_CELLS_JSON_PATH__, JSON.stringify(dataJson));
      console.info('->', '初始化细胞系表成功！');
    }
  }
}

function _InitNaiyaozhuTable(productTable) {
  let sheet = null;
  sheet = productTable.map(ele => {
    if (ele.name === '耐药株') { return ele; }
  })[1];

  if (!sheet || !sheet.data) { return console.warn('初始化表失败！' + '耐药株'); }

  // 因为有一行标题，所以去除
  sheet.data.shift();

  // console.log(sheet);

  let dataJson = {};
  if (sheet && sheet.data) {
    dataJson.title = sheet.data.shift();
    dataJson.data = [];
    dataJson.title.unshift('uuid');
    sheet.data.map((value, index) => {
      if (value && value.length > 0) {
        value.unshift(index + 1);
        dataJson.data.push(value);
      }
    });
    dataJson.createTime = Date.now();
    dataJson.updateTime = Date.now();

    if (dataJson && dataJson.title && dataJson.data) {
      fs.writeFileSync(__PRODUCT_NAIYAOZHU_JSON_PATH__, JSON.stringify(dataJson));
      console.info('->', '初始化耐药株表成功！');
    }
  }
}

function _InitYuandaiXibaoTable(productTable) {
  let sheet = null;
  sheet = productTable.map(ele => {
    if (ele.name === '原代细胞') { return ele; }
  })[2];

  if (!sheet || !sheet.data) { return console.warn('初始化表失败！' + '原代细胞'); }

  // 因为有一行标题，所以去除
  sheet.data.shift();

  let dataJson = {};
  if (sheet && sheet.data) {
    dataJson.title = sheet.data.shift();
    dataJson.data = [];
    dataJson.title.unshift('uuid');
    sheet.data.map((value, index) => {
      if (value && value.length > 0) {
        value.unshift(index + 1);
        dataJson.data.push(value);
      }
    });
    dataJson.createTime = Date.now();
    dataJson.updateTime = Date.now();

    if (dataJson && dataJson.title && dataJson.data) {
      fs.writeFileSync(__PRODUCT_YUANDAOXIBAO_JSON_PATH__, JSON.stringify(dataJson));
      console.info('->', '初始化原代细胞表成功！');
    }
  }
}

function _InitCas9Table(productTable) {
  let sheet = null;
  sheet = productTable.map(ele => {
    if (ele.name === 'Cas9') { return ele; }
  })[3];

  if (!sheet || !sheet.data) { return console.warn('初始化表失败！' + 'Cas9'); }

  // 因为有一行标题，所以去除
  sheet.data.shift();

  let dataJson = {};
  if (sheet && sheet.data) {
    dataJson.title = sheet.data.shift();
    dataJson.data = [];
    dataJson.title.unshift('uuid');
    sheet.data.map((value, index) => {
      if (value && value.length > 0) {
        value.unshift(index + 1);
        dataJson.data.push(value);
      }
    });
    dataJson.createTime = Date.now();
    dataJson.updateTime = Date.now();

    if (dataJson && dataJson.title && dataJson.data) {
      fs.writeFileSync(__PRODUCT_CAS9_JSON_PATH__, JSON.stringify(dataJson));
      console.info('->', '初始化Cas9表成功！');
    }
  }
}

function _InitCRISPRiTable(productTable) {
  let sheet = null;
  sheet = productTable.map(ele => {
    if (ele.name === 'CRISPRi') { return ele; }
  })[4];

  if (!sheet || !sheet.data) { return console.warn('初始化表失败！' + 'CRISPRi'); }

  // 因为有一行标题，所以去除
  sheet.data.shift();

  let dataJson = {};
  if (sheet && sheet.data) {
    dataJson.title = sheet.data.shift();
    dataJson.data = [];
    dataJson.title.unshift('uuid');
    sheet.data.map((value, index) => {
      if (value && value.length > 0) {
        value.unshift(index + 1);
        dataJson.data.push(value);
      }
    });
    dataJson.createTime = Date.now();
    dataJson.updateTime = Date.now();

    if (dataJson && dataJson.title && dataJson.data) {
      fs.writeFileSync(__PRODUCT_CRISPRi_JSON_PATH__, JSON.stringify(dataJson));
      console.info('->', '初始化CRISPRi表成功！');
    }
  }
}

function _InitLUC1Table(productTable) {
  let sheet = null;
  sheet = productTable.map(ele => {
    if (ele.name === 'Luc1') { return ele; }
  })[5];

  if (!sheet || !sheet.data) { return console.warn('初始化表失败！' + 'Luc1'); }

  // 因为有一行标题，所以去除
  sheet.data.shift();

  let dataJson = {};
  if (sheet && sheet.data) {
    dataJson.title = sheet.data.shift();
    dataJson.data = [];
    dataJson.title.unshift('uuid');
    sheet.data.map((value, index) => {
      if (value && value.length > 0) {
        value.unshift(index + 1);
        dataJson.data.push(value);
      }
    });
    dataJson.createTime = Date.now();
    dataJson.updateTime = Date.now();

    if (dataJson && dataJson.title && dataJson.data) {
      fs.writeFileSync(__PRODUCT_LUC1_JSON_PATH__, JSON.stringify(dataJson));
      console.info('->', '初始化LUC1表成功！');
    }
  }
}

function _InitLUC2Table(productTable) {
  let sheet = null;
  sheet = productTable.map(ele => {
    if (ele.name === 'Luc2') { return ele; }
  })[6];

  if (!sheet || !sheet.data) { return console.warn('初始化表失败！' + 'Luc2'); }

  // 因为有一行标题，所以去除
  sheet.data.shift();

  let dataJson = {};
  if (sheet && sheet.data) {
    dataJson.title = sheet.data.shift();
    dataJson.data = [];
    dataJson.title.unshift('uuid');
    sheet.data.map((value, index) => {
      if (value && value.length > 0) {
        value.unshift(index + 1);
        dataJson.data.push(value);
      }
    });
    dataJson.createTime = Date.now();
    dataJson.updateTime = Date.now();

    if (dataJson && dataJson.title && dataJson.data) {
      fs.writeFileSync(__PRODUCT_LUC2_JSON_PATH__, JSON.stringify(dataJson));
      console.info('->', '初始化LUC2表成功！');
    }
  }
}



// 获取数据表
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

function _GetDataJson(uri) {
  if (!fs.existsSync(uri)) {
    return { success: false, msg: 'DATA_FILE_NOT_FOUND' };
  }

  const dataJson = JSON.parse(fs.readFileSync(uri));
  if (dataJson) {
    return { success: true, msg: 'DATA_GET_SUCCESS', data: dataJson };
  }

  return { success: false, msg: 'DATA_GET_FAIL' };
}




const productModel = new ProductModel();

module.exports = productModel;