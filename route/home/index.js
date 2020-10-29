const { Article } = require('../../model/article');
// 导入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    // 获取页码值
    let page = req.query.page;
    // 从数据库中查询数据
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    // 先把查询出来的对象通过JSON.stringfy()转换为字符串
    result = JSON.stringify(result);
    // 再通过JSON.parse()将上面的字符串转换为对象，通过这样的一个处理可以解决模板报错问题
    result = JSON.parse(result);
    // res.send('欢迎来到博客首页');
    // res.send(result);
    // 渲染模板并传递数据
    res.render('home/default', {
        result: result,
    });
}