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
  const $tbody = $('.pro_list tbody');

  if (cells) {
    $tbody.html('');
    console.log(cells);

    var productNumberIdx = null;
    var productNameIdx = null;
    var productStandardIdx = null;
    var productPriceIdx = null;
    cells.title.map((value, index) => {
      if (value === "货号") { productNumberIdx = index; }
      if (value === "细胞名称") { productNameIdx = index; }
      if (value === "规格") { productStandardIdx = index; }
      if (value === "终端价") { productPriceIdx = index; }
    });

    cells.data.map((value, index) => {
      if (!value) { return; }
      $tbody.append('<tr id="cells_' + index + '"></tr>');
      $('#cells_' + index).append('<td>' + value[productNumberIdx] + '</td>');
      $('#cells_' + index).append('<td>' + value[productNameIdx] + '</td>');
      $('#cells_' + index).append('<td>' + value[productStandardIdx] + '</td>');
      $('#cells_' + index).append('<td>' + value[productPriceIdx] + '</td>');
    });


  }
}