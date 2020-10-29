function serializeToJson(form) {
    var obj = {};
    // serializeArray()方法得到下面的值
    // [{name: 'email', value: '用户输入的内容'}]
    var f = form.serializeArray();
    f.forEach(function (value) {
        // obj.email
        obj[value.name] = value.value;
    })
    return obj;
}