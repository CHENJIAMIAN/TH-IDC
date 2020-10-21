export const roomTypeOpts = [
    { id: 1, name: "精密空调房" },
    { id: 2, name: "UPS配电房" },
    { id: 3, name: "低压配电房" },
    { id: 4, name: "高压配电房" },
    { id: 5, name: "电池房" },
    { id: 6, name: "变压器房" },
    { id: 7, name: "IDC机房" },
];

export const sortValidator = (rule, value, callback) => {
    if (Number(value) > 100) {
        callback(new Error('不合法数值,需小于100'))
    } else {
        callback()
    }
}