// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入bcrypt模块
const bcrypt = require('bcrypt');
// 引入joi模块
const Joi = require('joi');
// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 规定这个值在数据库中是唯一的，即保证邮箱地址在插入数据库中不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,

    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    },
    // 0启用状态
    // 1禁用状态
    state: {
        type: Number,
        default: 0
    }
})

// 创建集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'itheima',
        email: 'itheima@itcast.cn',
        password: pass,
        role: 'admin',
        state: 0
    })
}

// createUser();

// 验证用户信息
const validateUser = user => {
    // 定义对象的验证规则
    const schema = Joi.object({
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email: Joi.string().email().required().error(new Error('邮箱不符合规则')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合规则')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')), // vaild('参数')表示客户端只能传递vaild里面规定的参数值，不然不通过验证
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法')),
    })
    // 实施验证
    return schema.validateAsync(user);
}

// 将用户集合作为模块成员进行导出
module.exports = {
    // 在es6中对象内如果属性名和属性值的名字一样则可以省略属性值
    // User: User,
    User,
    validateUser
    
}