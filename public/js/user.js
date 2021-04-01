$(function() {
    $('#btnUserLogin').on('click', function(e) {
        const url = config.apiServerProtocol + config.apiServerHost + ':' + config.apiServerPort + '/user/login';
        const data = {
            email: $('#txtEmailLogin').val(),
            password: $('#txtPasswordLogin').val()
        };

        $.ajax('http://localhost:81/user/login', {
            data,
            method: 'POST',
            dataType: 'json',
            xhrFields: { withCredentials: true },
            success: function(result) {
                console.log(result);
                if (result.success) {
                    alert('登录成功！');
                } else {
                    alert(result.msg);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    $('#btnUserSendVerifyCode').on('click', function(e) {
        const url = config.apiServerHost + ':' + config.apiServerPort + '/user/registe';
        const data = {
            email: $('#txtEmailRegiste').val(),
        };

        $.ajax('http://localhost:81/user/sendVerifyCode', {
            data,
            method: 'POST',
            dataType: 'json',
            xhrFields: { withCredentials: true },
            success: function(result) {
                console.log(result);
                if (result.success) {
                    alert('请在邮箱中查收！');
                } else {
                    alert(result.msg);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    $('#btnUserRegiste').on('click', function(e) {
        const url = config.apiServerHost + ':' + config.apiServerPort + '/user/registe';
        const data = {
            email: $('#txtEmailRegiste').val(),
            password: $('#txtPasswordRegiste').val(),
            verifyCode: $('#txtVerifyCodeRegiste').val(),
        };

        $.ajax('http://localhost:81/user/registe', {
            data,
            method: 'POST',
            dataType: 'json',
            xhrFields: { withCredentials: true },
            success: function(result) {
                console.log(result);
                if (result.success) {
                    alert('注册成功！');
                } else {
                    alert(result.msg);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    });


});