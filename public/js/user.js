const regPhone = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
const regEmail = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;


$(function () {
  $('#btnUserLogin').on('click', function (e) {
    const data = {
      email: $('#txtEmailLogin').val(),
      password: $('#txtPasswordLogin').val()
    };

    $.ajax({
      url: config.api.user.login,
      data,
      method: 'POST',
      dataType: 'json',
      xhrFields: { withCredentials: true },
      success: function (result) {
        if (result.success && result.data && result.data.user) {
          localStorage.setItem('user', JSON.stringify(result.data.user));
          $('#maskUser').hide();
          alert('登录成功！');
          window.location.reload();
        } else if (result.msg) {
          switch (result.msg) {
            case 'USER_LOGIN_FAIL':
              alert('登录失败！');
              break;
            case 'USER_NOT_FIND':
              alert('用户名未找到，请检查用户名或注册！');
              break;
            case 'USER_PASSOWRD_ERROR':
              alert('用户密码错误，请检查密码或 找回密码！');
              break;

            default:
              alert(result.msg);
              break;
          }
        } else {
          alert('登录失败！');
        }
      },
      error: function (err) {
        console.error(err);
      }
    });
  });

  $('#btnUserSendVerifyCode').on('click', function (e) {
    const data = {
      email: $('#txtEmailRegiste').val(),
    };

    $.ajax({
      url: config.api.user.sendVerifyCode,
      data,
      method: 'POST',
      dataType: 'json',
      xhrFields: { withCredentials: true },
      success: function (result) {
        if (result.success) {
          alert('请在邮箱中查收！');
        } else {
          alert(result.msg);
        }
      },
      error: function (err) {
        console.error(err);
      }
    });
  });

  $('#btnUserRegiste').on('click', function (e) {
    const data = {
      email: $('#txtEmailRegiste').val(),
      password: $('#txtPasswordRegiste').val(),
      verifyCode: $('#txtVerifyCodeRegiste').val(),
    };

    $.ajax({
      url: config.api.user.registe,
      data,
      method: 'POST',
      dataType: 'json',
      xhrFields: { withCredentials: true },
      success: function (result) {
        if (result.success) {
          alert('注册成功！');
          $('.to_login').trigger('click');
        } else {
          alert(result.msg);
        }
      },
      error: function (err) {
        console.error(err);
      }
    });
  });

  $('#btnCommitLiuyan').on('click', function () {
    const data = {
      fullname: $('#txtLiuyan_Fullname').val(),
      phone: $('#numLiuyan_Phone').val(),
      email: $('#txtLiuyan_Email').val(),
      company: $('#txtLiuyan_company').val(),
      city: $('#txtLiuyan_City').val(),
      message: $('#txtareaLiuyan_content').val(),
    };

    if (!data.fullname) {
      $('#txtLiuyan_Fullname').focus();
      return alert("姓名有误！");
    }

    if (!regPhone.test(data.phone)) {
      $('#numLiuyan_Phone').focus();
      return alert("手机有误！");
    }

    if (!regEmail.test(data.email)) {
      $('#txtLiuyan_Email').focus();
      return alert("邮箱有误！");
    }

    if (!data.company) {
      $('#txtLiuyan_company').focus();
      return alert("公司名称有误！");
    }

    if (!data.city) {
      $('#txtLiuyan_City').focus();
      return alert("城市名称有误！");
    }

    if (!data.message) {
      $('#txtareaLiuyan_content').focus();
      return alert("留言内容有误！");
    }

    $.ajax({
      url: config.api.user.liuyan,
      data,
      method: 'POST',
      dataType: 'json',
      xhrFields: { withCredentials: true },
      success: function (result) {
        if (result.success) {
          alert('留言成功！');
        } else {
          alert(result.msg);
        }
      },
      error: function (err) {
        console.error(err);
      }
    });
  });


});