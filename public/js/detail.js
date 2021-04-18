$(function () {
  const urlParams = $.GetRequest();

  if (urlParams && urlParams.cellUuid) {
    $.ajax({
      method: 'post',
      url: config.api.product.getCell,
      data: { cellUuid: urlParams.cellUuid },
      xhrFields: { withCredentials: true },
      success: function (result) {
        if (result.success && result.data && result.data.cell) {
          return _RenderDetaiil(result.data.cell);
        }

        alert('获取细胞详情失败！');
        window.close();
      },
      error: function (err) {
        console.error(err);
        alert('获取细胞详情失败！');
        window.close();
      }
    });
  }

});


function _RenderDetaiil(cell) {
  const $cellTable = $('#cellTable');
  $cellTable.html("");

  if (cell && cell.title && cell.data) {
    const userInfo = JSON.parse(localStorage.getItem('user'));

    $cellTable.append('<thead id="cellThead"></thead>');
    $cellTable.append('<tbody id="cellTbody"></tbody>');

    const $cellThead = $('#cellThead');
    const $cellTbody = $('#cellTbody');

    $cellThead.append('<tr><th style="width:20%;">属性名</th><th>属性值</th></tr>');

    for (const [index, value] of cell.title.entries()) {
      if (value === "终端价" && !userInfo) { continue; }

      $cellTbody.append('<tr id="cell_' + value + '_' + index + '"></tr>')
      const $cellTr = $('#cell_' + value + '_' + index);

      $cellTr.append('<td>' + value + '</td>');
      $cellTr.append('<td>' + cell.data[index] + '</td>');

    }
  }
}

