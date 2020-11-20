export const valueTypeOpts = [
    { id: 1, name: "整型" },
    { id: 2, name: "长整型" },
    { id: 3, name: "浮点型" },
    { id: 4, name: "布尔型" },
    { id: 5, name: "字符串" },
    { id: 6, name: "时间戳" },
];

export const noteModeOpts = [
    { id: 1, name: "邮箱" },
    { id: 2, name: "短信" },
    { id: 3, name: "语音" },
    { id: 4, name: "微信" },
    { id: 5, name: "钉钉" },
    { id: 6, name: "声光" },
];

export const deviceTypeOptsasdf = {
    id: 15, name: "水浸",
    id: 14, name: "氢气探测器",
    id: 13, name: "温湿度",
    id: 12, name: "空调",
    id: 11, name: "列头柜",
    id: 10, name: "UPS逆变器",
    id: 9, name: "UPS变换器",
    id: 8, name: "UPS主机",
    id: 7, name: "蓄电池",
    id: 6, name: "柴油发电机组",
    id: 5, name: "配电柜",
    id: 4, name: "低压进线柜",
    id: 3, name: "变压器",
    id: 2, name: "直流操作电源柜",
    id: 1, name: "母联柜"
}


export const imgTypeOpts = [
    { id: 1, name: "北向开关" },
    { id: 2, name: "东向开关" },
    { id: 3, name: "西向开关" },
    { id: 4, name: "南向开关" },
    { id: 5, name: "温度计" }
];

export const isIntNumber = (rule, value, callback) => {
    if (!rule.required && (value === undefined || value === "")) {
        callback()
    }
    if (value === "" || !Number.isInteger(+value) || +value < 0) {
        callback(new Error('请输入整数值'));
    } else {
        callback()
    }
}

export const isBiggerThanZero = (rule, value, callback) => {
    if (value === "" || isNaN(value) || Number(value) < 0) {
        callback(new Error('请输入非负数字'));
    } else {
        callback()
    }
}

