// 引入mongoose第三方模块
// 解决MongoDB弃用警告 使用findOne时会有提示
// https://www.cnblogs.com/vientiane/p/10949549.html
const mongoose = require('mongoose');
// 导入config模块
const config = require('config');
mongoose.set('useCreateIndex', true);
// 链接数据库
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库链接成功'))
    .catch(() => console.llog('数据库链接失败'))