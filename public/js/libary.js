$(function () {
  _BindTrigger();

  $('#aGetProductXibaoxi').trigger('click');
});


function _BindTrigger() {
  $('#aGetProductXibaoxi').on('click', function () { TriggerGetData(config.api.product.getCells); });

  $('#aGetProductNaiyaozhu').on('click', function () { TriggerGetData(config.api.product.getNaiyaozhu); });

  $('#aGetProductYuandaixibao').on('click', function () { TriggerGetData(config.api.product.getYuandaixibao); });

  $('#aGetProductCas9').on('click', function () { TriggerGetData(config.api.product.getCas9); });

  $('#aGetProductCRISPRi').on('click', function () { TriggerGetData(config.api.product.getCRISPRi); });

  $('#aGetProductLuc1').on('click', function () { TriggerGetData(config.api.product.getLuc1); });

  $('#aGetProductLuc2').on('click', function () { TriggerGetData(config.api.product.getLuc2); });
}

function TriggerGetData(uri) {
  const params = $.GetRequest(decodeURI(window.location.search));

  console.log(uri, new Date());
  $.ajax({
    method: 'post',
    url: uri,
    data: { keyword: params.keyword || null },
    xhrFields: { withCredentials: true },
    success: function (result) {
      console.log(typeof (uri), uri, uri === config.api.product.getNaiyaozhu, result);
      if (result.success && result.data) {

        if (uri === config.api.product.getCells) { GeneralProduct(result.data); }
        else if (uri === config.api.product.getNaiyaozhu) { GeneralNaiyaozhu(result.data); }
        else if (uri === config.api.product.getYuandaixibao) { GeneralYuandaixibao(result.data); }
        else if (uri === config.api.product.getCas9) { GeneraCas9(result.data); }
        else if (uri === config.api.product.getCRISPRi) { GeneralCRISPRi(result.data); }
        else if (uri === config.api.product.getLuc1) { GeneralLuc1(result.data); }
        else if (uri === config.api.product.getLuc2) { GeneralLuc2(result.data); }
        else { $('.pro_list tbody').html('暂无查到相关产品！'); }

      }
    },
    error: function (err) {
      console.error(err);
    }
  });
}

function GeneralProduct(data) {
  const cells = data.cellsJson;

  if (!cells) { alert('暂无相关产品！'); $('.pro_list tbody').html('暂无查到相关产品！'); return; }

  if (cells) {
    const $thead = $('.pro_list thead tr');
    const $tbody = $('.pro_list tbody');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    // 分类和分页删除
    // $('.pro_index').html('');
    $('.pro_paging').html('');
    $thead.html('');
    $tbody.html('');

    // 设置样式
    $('.tab_list li a').removeClass('cur');
    $('#aGetProductXibaoxi').addClass('cur');

    // 获取字段列索引号
    var productUuidIdx = null;
    var productNumberIdx = null;
    var productNameIdx = null;
    var productNameENIdx = null;
    var productStandardIdx = null;
    var productPriceIdx = null;
    var productPeiyangtixiIdx = null;
    var productShengzhangtexingIdx = null;

    $thead.append('<th scope="col" style="width:auto;">货号</th>');
    $thead.append('<th scope="col" style="width:12%;">中文名称</th>');
    $thead.append('<th scope="col" style="width:10%;">英文名称</th>');
    // $thead.append('<th scope="col" style="width:7%;">规格</th>');
    $thead.append('<th scope="col" style="width:auto;">培养体系</th>');
    $thead.append('<th scope="col" style="width:20%;">生长特性（悬浮/贴壁）</th>');
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">终端价</th>'); }

    cells.title.map((value, index) => {
      if (value === "uuid") { productUuidIdx = index; }

      if (value === "货号") { productNumberIdx = index; }

      if (value === "细胞名称") { productNameIdx = index; }

      if (value === "英文") { productNameENIdx = index; }

      // if (value === "规格") { productStandardIdx = index; }

      if (value === "培养体系") { productPeiyangtixiIdx = index; }

      if (value === "生长特性（悬浮/贴壁）") { productShengzhangtexingIdx = index; }

      if (value === "终端价" && userInfo) { productPriceIdx = index; }
    });


    cells.data.map((value, index) => {
      if (value && value[productNumberIdx]) {
        $tbody.append('<tr id="cells_' + index + '" uuid="' + value[productUuidIdx] + '"></tr>');
        $('#cells_' + index).append('<td>' + value[productNumberIdx] + '</td>');
        $('#cells_' + index).append('<td>' + value[productNameIdx] + '</td>');
        $('#cells_' + index).append('<td>' + value[productNameENIdx] + '</td>');
        // $('#cells_' + index).append('<td>' + value[productStandardIdx] + '</td>');
        $('#cells_' + index).append('<td>' + value[productPeiyangtixiIdx] + '</td>');
        $('#cells_' + index).append('<td>' + value[productShengzhangtexingIdx] + '</td>');
        if (userInfo) { $('#cells_' + index).append('<td>' + value[productPriceIdx] + '</td>'); }

        $('#cells_' + index).on('click', BlankToCellDetail);
      }
    });


  }
}

function GeneralNaiyaozhu(data) {
  const dataList = data.dataJson;

  if (!dataList) { alert('暂无相关产品！'); $('.pro_list tbody').html('暂无查到相关产品！'); return; }


  if (dataList) {
    const $thead = $('.pro_list thead tr');
    const $tbody = $('.pro_list tbody');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    // 分类和分页删除
    // $('.pro_index').html('');
    $('.pro_paging').html('');
    $thead.html('');
    $tbody.html('');

    // 设置样式
    $('.tab_list li a').removeClass('cur');
    $('#aGetProductNaiyaozhu').addClass('cur');

    // 获取字段列索引号
    var productUuidIdx = null;
    var productNumberIdx = null;
    var productNameIdx = null;
    var productNameENIdx = null;
    var productPriceIdx = null;
    var productJinxiaoPriceIdx = null;

    $thead.append('<th scope="col" style="width:auto;">中文名称</th>');
    $thead.append('<th scope="col" style="width:auto;">英文名称</th>');
    $thead.append('<th scope="col" style="width:auto;">货号</th>');
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">终端价</th>'); }
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">经销价</th>'); }

    dataList.title.map((value, index) => {
      if (value === "uuid") { productUuidIdx = index; }

      if (value === "货号") { productNumberIdx = index; }

      if (value === "中文") { productNameIdx = index; }

      if (value === "名称") { productNameENIdx = index; }

      if (value === "终端价" && userInfo) { productPriceIdx = index; }

      if (value === "经销价" && userInfo) { productJinxiaoPriceIdx = index; }
    });

    dataList.data.map((value, index) => {
      if (value && value[productNumberIdx]) {
        $tbody.append('<tr id="naiyaozhu_' + index + '" uuid="' + value[productUuidIdx] + '"></tr>');
        $('#naiyaozhu_' + index).append('<td>' + value[productNumberIdx] + '</td>');
        $('#naiyaozhu_' + index).append('<td>' + value[productNameIdx] + '</td>');
        $('#naiyaozhu_' + index).append('<td>' + value[productNameENIdx] + '</td>');
        if (userInfo) { $('#naiyaozhu_' + index).append('<td>' + value[productPriceIdx] + '</td>'); }
        if (userInfo) { $('#naiyaozhu_' + index).append('<td>' + value[productJinxiaoPriceIdx] + '</td>'); }

        $('#naiyaozhu_' + index).on('click', function () { BlankToProductDetail('/product/detail?naiyaozhuUuid='); });
      }
    });
  }
}

function GeneralYuandaixibao(data) {
  const dataList = data.dataJson;

  if (!dataList) { alert('暂无相关产品！'); $('.pro_list tbody').html('暂无查到相关产品！'); return; }


  if (dataList) {
    const $thead = $('.pro_list thead tr');
    const $tbody = $('.pro_list tbody');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    // 分类和分页删除
    // $('.pro_index').html('');
    $('.pro_paging').html('');
    $thead.html('');
    $tbody.html('');

    // 设置样式
    $('.tab_list li a').removeClass('cur');
    $('#aGetProductYuandaixibao').addClass('cur');

    // 获取字段列索引号
    var productUuidIdx = null;
    var productNumberIdx = null;
    var productNameIdx = null;
    var productTypeIdx = null;
    var productPriceIdx = null;
    var productJinxiaoPriceIdx = null;

    $thead.append('<th scope="col" style="width:auto;">种属</th>');
    $thead.append('<th scope="col" style="width:auto;">原代细胞中文名称</th>');
    $thead.append('<th scope="col" style="width:auto;">产品货号</th>');
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">终端价</th>'); }
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">经销价</th>'); }

    dataList.title.map((value, index) => {
      if (value === "uuid") { productUuidIdx = index; }

      if (value === "产品货号") { productNumberIdx = index; }

      if (value === "原代细胞中文名称") { productNameIdx = index; }

      if (value === "种属") { productTypeIdx = index; }

      if (value === "终端价" && userInfo) { productPriceIdx = index; }

      if (value === "经销价" && userInfo) { productJinxiaoPriceIdx = index; }
    });

    dataList.data.map((value, index) => {
      if (value && value[productNumberIdx]) {
        $tbody.append('<tr id="naiyaozhu_' + index + '" uuid="' + value[productUuidIdx] + '"></tr>');
        $('#naiyaozhu_' + index).append('<td>' + value[productTypeIdx] + '</td>');
        $('#naiyaozhu_' + index).append('<td>' + value[productNumberIdx] + '</td>');
        $('#naiyaozhu_' + index).append('<td>' + value[productNameIdx] + '</td>');
        if (userInfo) { $('#naiyaozhu_' + index).append('<td>' + value[productPriceIdx] + '</td>'); }
        if (userInfo) { $('#naiyaozhu_' + index).append('<td>' + value[productJinxiaoPriceIdx] + '</td>'); }

        $('#naiyaozhu_' + index).on('click', function () { BlankToProductDetail('/product/detail?yuandaixibaoUuid='); });
      }
    });
  }
}

function GeneraCas9(data) {
  const dataList = data.dataJson;

  if (!dataList) { alert('暂无相关产品！'); $('.pro_list tbody').html('暂无查到相关产品！'); return; }


  if (dataList) {
    const $thead = $('.pro_list thead tr');
    const $tbody = $('.pro_list tbody');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    // 分类和分页删除
    // $('.pro_index').html('');
    $('.pro_paging').html('');
    $thead.html('');
    $tbody.html('');

    // 设置样式
    $('.tab_list li a').removeClass('cur');
    $('#aGetProductCas9').addClass('cur');

    // 获取字段列索引号
    var productUuidIdx = null;
    var productNumberIdx = null;
    var productNameIdx = null;
    var productTypeIdx = null;
    var productFromIdx = null;
    var productPriceIdx = null;
    var productJinxiaoPriceIdx = null;

    $thead.append('<th scope="col" style="width:auto;">细胞名称</th>');
    $thead.append('<th scope="col" style="width:auto;">货号</th>');
    $thead.append('<th scope="col" style="width:auto;">组织来源</th>');
    $thead.append('<th scope="col" style="width:auto;">种属</th>');
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">终端价</th>'); }
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">经销价</th>'); }

    dataList.title.map((value, index) => {
      if (value === "uuid") { productUuidIdx = index; }

      if (value === "货号") { productNumberIdx = index; }

      if (value === "细胞名称") { productNameIdx = index; }

      if (value === "种属") { productTypeIdx = index; }

      if (value === "组织来源") { productFromIdx = index; }

      if (value === "终端价" && userInfo) { productPriceIdx = index; }

      if (value === "经销价" && userInfo) { productJinxiaoPriceIdx = index; }
    });

    dataList.data.map((value, index) => {
      if (value && value[productNumberIdx]) {
        $tbody.append('<tr id="naiyaozhu_' + index + '" uuid="' + value[productUuidIdx] + '"></tr>');
        $('#naiyaozhu_' + index).append('<td>' + value[productNameIdx] + '</td>');
        $('#naiyaozhu_' + index).append('<td>' + value[productNumberIdx] + '</td>');
        $('#naiyaozhu_' + index).append('<td>' + value[productFromIdx] + '</td>');
        $('#naiyaozhu_' + index).append('<td>' + value[productTypeIdx] + '</td>');
        if (userInfo) { $('#naiyaozhu_' + index).append('<td>' + value[productPriceIdx] + '</td>'); }
        if (userInfo) { $('#naiyaozhu_' + index).append('<td>' + value[productJinxiaoPriceIdx] + '</td>'); }

        $('#naiyaozhu_' + index).on('click', function () { BlankToProductDetail('/product/detail?Cas9Uuid='); });
      }
    });
  }
}

function GeneralCRISPRi(data) {
  const dataList = data.dataJson;

  if (!dataList) { alert('暂无相关产品！'); $('.pro_list tbody').html('暂无查到相关产品！'); return; }


  if (dataList) {
    const $thead = $('.pro_list thead tr');
    const $tbody = $('.pro_list tbody');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    // 分类和分页删除
    // $('.pro_index').html('');
    $('.pro_paging').html('');
    $thead.html('');
    $tbody.html('');

    // 设置样式
    $('.tab_list li a').removeClass('cur');
    $('#aGetProductCRISPRi').addClass('cur');

    // 获取字段列索引号
    var productUuidIdx = null;
    var productNumberIdx = null;
    var productNameIdx = null;
    var productTypeIdx = null;
    var productFromIdx = null;
    var productPriceIdx = null;
    var productJinxiaoPriceIdx = null;

    $thead.append('<th scope="col" style="width:auto;">细胞名称</th>');
    $thead.append('<th scope="col" style="width:auto;">货号</th>');
    $thead.append('<th scope="col" style="width:auto;">组织来源</th>');
    $thead.append('<th scope="col" style="width:auto;">种属</th>');
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">终端价</th>'); }
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">经销价</th>'); }

    dataList.title.map((value, index) => {
      if (value === "uuid") { productUuidIdx = index; }

      if (value === "货号") { productNumberIdx = index; }

      if (value === "细胞名称") { productNameIdx = index; }

      if (value === "种属") { productTypeIdx = index; }

      if (value === "组织来源") { productFromIdx = index; }

      if (value === "终端价" && userInfo) { productPriceIdx = index; }

      if (value === "经销价" && userInfo) { productJinxiaoPriceIdx = index; }
    });

    dataList.data.map((value, index) => {
      if (value && value[productNumberIdx]) {
        $tbody.append('<tr id="naiyaozhu_' + index + '" uuid="' + value[productUuidIdx] + '"></tr>');
        $('#naiyaozhu_' + index).append('<td>' + value[productNameIdx] + '</td>');
        $('#naiyaozhu_' + index).append('<td>' + value[productNumberIdx] + '</td>');
        $('#naiyaozhu_' + index).append('<td>' + value[productFromIdx] + '</td>');
        $('#naiyaozhu_' + index).append('<td>' + value[productTypeIdx] + '</td>');
        if (userInfo) { $('#naiyaozhu_' + index).append('<td>' + value[productPriceIdx] + '</td>'); }
        if (userInfo) { $('#naiyaozhu_' + index).append('<td>' + value[productJinxiaoPriceIdx] + '</td>'); }

        $('#naiyaozhu_' + index).on('click', function () { BlankToProductDetail('/product/detail?CRISPRiUuid='); });
      }
    });
  }
}

function GeneralLuc1(data) {
  const dataList = data.dataJson;

  if (!dataList) { alert('暂无相关产品！'); $('.pro_list tbody').html('暂无查到相关产品！'); return; }


  if (dataList) {
    const $thead = $('.pro_list thead tr');
    const $tbody = $('.pro_list tbody');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    // 分类和分页删除
    // $('.pro_index').html('');
    $('.pro_paging').html('');
    $thead.html('');
    $tbody.html('');

    // 设置样式
    $('.tab_list li a').removeClass('cur');
    $('#aGetProductLuc1').addClass('cur');

    // 获取字段列索引号
    var productUuidIdx = null;
    var productCellTypeIdx = null;
    var productTypeIdx = null;
    var productFromIdx = null;
    var productPriceIdx = null;
    var productJinxiaoPriceIdx = null;

    $thead.append('<th scope="col" style="width:auto;">细胞类型</th>');
    $thead.append('<th scope="col" style="width:auto;">组织来源</th>');
    $thead.append('<th scope="col" style="width:auto;">种属</th>');
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">终端价</th>'); }
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">经销价</th>'); }

    dataList.title.map((value, index) => {
      if (value === "uuid") { productUuidIdx = index; }

      if (value === "细胞类型") { productCellTypeIdx = index; }

      if (value === "种属") { productTypeIdx = index; }

      if (value === "组织来源") { productFromIdx = index; }

      if (value === "终端价" && userInfo) { productPriceIdx = index; }

      if (value === "经销价" && userInfo) { productJinxiaoPriceIdx = index; }
    });

    dataList.data.map((value, index) => {
      $tbody.append('<tr id="naiyaozhu_' + index + '" uuid="' + value[productUuidIdx] + '"></tr>');
      $('#naiyaozhu_' + index).append('<td>' + value[productCellTypeIdx] + '</td>');
      $('#naiyaozhu_' + index).append('<td>' + value[productFromIdx] + '</td>');
      $('#naiyaozhu_' + index).append('<td>' + value[productTypeIdx] + '</td>');
      if (userInfo) { $('#naiyaozhu_' + index).append('<td>' + value[productPriceIdx] + '</td>'); }
      if (userInfo) { $('#naiyaozhu_' + index).append('<td>' + value[productJinxiaoPriceIdx] + '</td>'); }

      $('#naiyaozhu_' + index).on('click', function () { BlankToProductDetail('/product/detail?Luc1Uuid='); });
    });
  }
}

function GeneralLuc2(data) {
  const dataList = data.dataJson;

  if (!dataList) { alert('暂无相关产品！'); $('.pro_list tbody').html('暂无查到相关产品！'); return; }


  if (dataList) {
    const $thead = $('.pro_list thead tr');
    const $tbody = $('.pro_list tbody');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    // 分类和分页删除
    // $('.pro_index').html('');
    $('.pro_paging').html('');
    $thead.html('');
    $tbody.html('');

    // 设置样式
    $('.tab_list li a').removeClass('cur');
    $('#aGetProductLuc2').addClass('cur');

    // 获取字段列索引号
    var productUuidIdx = null;
    var productNumberIdx = null;
    var productNameIdx = null;
    var productTypeIdx = null;
    var productFromIdx = null;
    var productPriceIdx = null;
    var productJinxiaoPriceIdx = null;

    $thead.append('<th scope="col" style="width:auto;">细胞名称</th>');
    $thead.append('<th scope="col" style="width:auto;">货号</th>');
    $thead.append('<th scope="col" style="width:auto;">组织来源</th>');
    $thead.append('<th scope="col" style="width:auto;">种属</th>');
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">终端价</th>'); }
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">经销价</th>'); }

    dataList.title.map((value, index) => {
      if (value === "uuid") { productUuidIdx = index; }

      if (value === "货号") { productNumberIdx = index; }

      if (value === "细胞名称") { productNameIdx = index; }

      if (value === "种属") { productTypeIdx = index; }

      if (value === "组织来源") { productFromIdx = index; }

      if (value === "终端价" && userInfo) { productPriceIdx = index; }

      if (value === "经销价" && userInfo) { productJinxiaoPriceIdx = index; }
    });

    dataList.data.map((value, index) => {
      if (value && value[productNumberIdx]) {
        $tbody.append('<tr id="naiyaozhu_' + index + '" uuid="' + value[productUuidIdx] + '"></tr>');
        $('#naiyaozhu_' + index).append('<td>' + value[productNameIdx] + '</td>');
        $('#naiyaozhu_' + index).append('<td>' + value[productNumberIdx] + '</td>');
        $('#naiyaozhu_' + index).append('<td>' + value[productFromIdx] + '</td>');
        $('#naiyaozhu_' + index).append('<td>' + value[productTypeIdx] + '</td>');
        if (userInfo) { $('#naiyaozhu_' + index).append('<td>' + value[productPriceIdx] + '</td>'); }
        if (userInfo) { $('#naiyaozhu_' + index).append('<td>' + value[productJinxiaoPriceIdx] + '</td>'); }

        $('#naiyaozhu_' + index).on('click', function () { BlankToProductDetail('/product/detail?Luc2Uuid='); });
      }
    });
  }
}



function BlankToCellDetail() {
  const cellUuid = $(this).attr('uuid');

  console.log(this);
  console.log(cellUuid);

  if (!cellUuid) { return alert('暂无该产品详情页'); }

  $.OpenWindow("/product/detail?cellUuid=" + cellUuid);
}

function BlankToProductDetail(url) {
  const productUuid = $(this).attr('uuid');

  if (!productUuid) { return alert('暂无该产品详情页'); }

  $.OpenWindow(url + productUuid);
}