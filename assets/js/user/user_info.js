$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        // nickname: function (value) {
        //     if (value.length > 6) {
        //         return '昵称长度必须在1-6个字符之间'
        //     }

        // }
        nickname: [
            /^[\S]{6,12}$/, '昵称必须6到12位，且不能出现空格'
        ]
    })

    initUserInfo()

    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                // 调用 form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        // 获取用户最新的数据，重新渲染到页面
        initUserInfo()
    })

    // 监听表单的提交方式
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        // 发起ajax数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})