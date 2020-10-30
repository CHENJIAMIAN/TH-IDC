export const valueTypeOpts = [
    { id: 1, name: "整型" },
    { id: 2, name: "长整型" },
    { id: 3, name: "浮点型" },
    { id: 4, name: "布尔型" },
    { id: 5, name: "字符串" },
    { id: 6, name: "时间戳" },
];

export const sortValidator = (rule, value, callback) => {
    if (Number(value) > 100) {
        callback(new Error('不合法数值,需小于100'))
    } else {
        callback()
    }
}