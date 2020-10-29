// 导入用户集合构造函数
const { User } = require('../../model/user');
module.exports = async (req, res) => {

    // 标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // 接收客户端传递过来的参数 当前页
    let page = req.query.page || 1;
    // 每一页显示的数据条数
    let pagesize = 10;
    // 查询用户数据的总数
    let count = await User.countDocuments({});
    // 总页数
    let total = Math.ceil(count / pagesize);
    // 页码对应的数据查询开始位置
    let start = (page - 1) * pagesize;

    // 将用户信息查询出来
    let users = await User.find({}).limit(pagesize).skip(start);
    // 切记render里面的路径最前满不要带 / 
    // 渲染用户列表模板
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    });
    // res.render('/admin/user');
}