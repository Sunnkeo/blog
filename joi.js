// 此模块变化较大现在的正确用法参考网址 https://joi.dev/api/?v=17.2.1

// 引入模块
const Joi = require('joi');

// 定义对象的验证规则
// const schema = {
//     username: Joi.string().min(2).max(3),
// };
const schema = Joi.object({
    username: Joi.string().min(2).max(5).required().error(new Error('username属性没有通过验证')),
    birth: Joi.number().min(1900).max(2020).error(new Error('birth属性没有通过验证')),
})

// 实施验证
async function run() {
    try {
        // 实施验证
        await schema.validateAsync({ username: 'ab',birth: '1800'});
    } catch (ex) {
        console.log(ex.message);
        return;
    }
    console.log('验证通过');
}

run();