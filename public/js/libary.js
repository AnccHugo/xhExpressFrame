$(function () {
  $.ajax({
    method: 'post',
    url: config.api.product.getCells,
    xhrFields: {
      withCredentials: true
    },
    success: function (data) {
      if (data.success && data.data) {
        GeneralProduct(data.data);
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
});


function GeneralProduct(data) {
  const cells = data.cellsJson;

  if (cells) {
    const $thead = $('.pro_list thead tr');
    const $tbody = $('.pro_list tbody');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    // 分类和分页删除
    $('.pro_index').html('');
    $('.pro_paging').html('');
    $thead.html('');
    $tbody.html('');

    var productUuidIdx = null;
    var productNumberIdx = null;
    var productNameIdx = null;
    var productNameENIdx = null;
    var productStandardIdx = null;
    var productPriceIdx = null;
    var productPeiyangtixiIdx = null;
    var productShengzhangtexingIdx = null;

    $thead.append('<th scope="col" style="width:auto;">货号</th>');
    $thead.append('<th scope="col" style="width:12%;">细胞名称</th>');
    $thead.append('<th scope="col" style="width:10%;">英文</th>');
    $thead.append('<th scope="col" style="width:7%;">规格</th>');
    $thead.append('<th scope="col" style="width:auto;">培养体系</th>');
    $thead.append('<th scope="col" style="width:20%;">生长特性（悬浮/贴壁）</th>');
    if (userInfo) { $thead.append('<th scope="col" style="width:auto;">终端价</th>'); }

    cells.title.map((value, index) => {
      if (value === "uuid") { productUuidIdx = index; }

      if (value === "货号") { productNumberIdx = index; }

      if (value === "细胞名称") { productNameIdx = index; }

      if (value === "英文") { productNameENIdx = index; }

      if (value === "规格") { productStandardIdx = index; }

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
        $('#cells_' + index).append('<td>' + value[productStandardIdx] + '</td>');
        $('#cells_' + index).append('<td>' + value[productPeiyangtixiIdx] + '</td>');
        $('#cells_' + index).append('<td>' + value[productShengzhangtexingIdx] + '</td>');
        if (userInfo) { $('#cells_' + index).append('<td>' + value[productPriceIdx] + '</td>'); }

        $('#cells_' + index).on('click', BlankToCellDetail);
      }
    });


  }
}


function BlankToCellDetail() {
  const cellUuid = $(this).attr('uuid');

  if (!cellUuid) {
    return alert('暂无该产品详情页');
  }

  const detailPageUrl =  "/product/detail?cellUuid=" + cellUuid;
  
  window.open(detailPageUrl, '_blank');

}