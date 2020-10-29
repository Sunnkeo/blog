// 将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
// 导入mongoose-sex-page第三方模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    const page = req.query.page;
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    // 查询所有文章数据
    // https://www.cnblogs.com/dreamer-lin/p/13674413.html通过这个网址的提供的方法可以解决添加.populate()方法后模板渲染出错
    // let articles = await Article.find().populate('author').lean();
    // page 指定当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 向数据库发送查询请求
    // 当导入了第三方模块mongoose-sex-page后不能使用lean()要用到方案二
    // https://www.cnblogs.com/jeacy/p/13560379.html 解决方法是这个页面中的最终解决方案
    let articles = await pagination(Article).page(page).size(2).display(3).find().populate('author').exec();
    // 先把查询出来的对象通过JSON.stringfy()转换为字符串
    articles = JSON.stringify(articles);
    // 再通过JSON.parse()将上面的字符串转换为对象，通过这样的一个处理可以解决模板报错问题
    articles = JSON.parse(articles);
    // res.send(articles);
    // 渲染文章列表页面模板
    res.render('admin/article.art', {
        articles: articles
    });
}