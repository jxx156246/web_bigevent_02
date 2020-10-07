$(function() {
    //登录注册点击事件
    $("#link_reg").on('click', function() {
        $(".login-box").hide();
        $(".reg-box").show()
    });
    $("#link_login").on('click', function() {
        $(".login-box").show();
        $(".reg-box").hide()
    });
    //表单验证
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $("#form_reg [name=password]").val();
            if (pwd !== value) {
                return '两次输入密码不一致'
            };
        }
    });
    //监听注册数据
    var layer = layui.layer;
    $("#form_reg").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                layer.msg('注册成功，请登陆')
                $("#link_login").click();
            }
        })

    });
    //监听登录事件
    $("#form_login").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})