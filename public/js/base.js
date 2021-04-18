$(function () {
  // 网站标题
  window.document.title = config.siteTitle;



  Init();
});



function Init() {
  Bind_MaskUser();
  Bind_Userbox();
  Bind_SearchCell();
}

function Bind_SearchCell(){


}

function Bind_MaskUser() {
  // 打开用户界面遮罩
  $("#aLogin").on('click', function () {
    $('#maskUser').show();
    $('.to_login').trigger('click');
  });

  $("#aRegiste").on('click', function () {
    $('#maskUser').show();
    $('.to_registe').trigger('click');
  });

  // 关闭用户界面遮罩
  $('.click_off').on('click', function () {
    $('#maskUser').hide();
  })
}

function Bind_Userbox() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.email) {
    console.log(user);
    $('#spLoginUsername').text('用户: ' + user.email);
    $('.navigation_top .menu .user_menu').hide();
    $('.navigation_top .menu .user_is_login').show();
  }

  $('#aLogout').on('click', function () {
    localStorage.removeItem('user');
    window.location.reload();
  });

  $('.user_tab li').each(function (idx, ele) {
    $(ele).on('click', function () {
      $(this).addClass('active').siblings().removeClass('active');

      if (idx == 0) {
        $('#divRegiste').hide();
        $('#divLogin').show();
      } else if (idx == 1) {
        $('#divLogin').hide();
        $('#divRegiste').show();
      }
    });
  });

}

