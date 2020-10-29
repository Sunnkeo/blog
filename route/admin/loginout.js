module.exports = (req, res) => {
    // 删除session
    // 这个方法内部会自动根据cookie当中所存储的sessionId来删除当前用户所对应的session信息
    req.session.destroy(function () {
        // 删除cookie
        res.clearCookie('connect.sid');
        // 重定向到用户登录页面
        res.redirect('/admin/login');
        // 清除模板中的用户信息 
        req.app.locals.userInfo = null;
    })
}