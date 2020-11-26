/* 
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
*/
// 公共的,大家都有
pointLocations
有采点位置的测点列表
    id
    位置id
    pointId
    测点id
    deviceGroupId
    设备组id
    location
    位置信息
    imgType
    图片类型1北向开关，2东向开关3西向开关，4南向开关，5温度计
    value
    测点采集到的最近值

// 3 7 13公共
temperature
温度

4
cityElectric
市电状态
activePower
有功功率
apparentPower
视在功率
reactivePower
无功功率
electricalDegree
电度

// 1 2 4 6 11 12公共
onOff
开关状态


// 3 4 8公共
frequency
频率

// 3 4 公共
pa
pa
pb
pb
pc
pc
pfa
pfa
pfb
pfb
pfc
pfc

// 1 3 5 6 8 11公共
ua
UA
ub
UB
uc
UC
uab
UAB
ubc
UBC
uac
UAC
ia
IA
ib
IB
ic
IC

2
list
数据列表
storedVoltage
贮能电压
controlVoltage
控制电压
floatingVoltage
浮充电压
batteryVoltage
电池电压
chargeCurrent
充电电流

6
rotateSpeed
转速
waterTemp
水温
lubricateOilPressure
润滑油油压
lubricateOilTemp
润滑油油温
startBatteryVoltage
启动电池电压
outputPower
输出功率
outputVoltage
输出电压
oilLevel
液（油）位
workState
工作状态（运行/停机）
workMode
工作方式（自动/手动）

7
chargeCurrent
充电电流
dischargeCurrent
放电电流
voltage
电压
internalResistance
内阻

9
inVoltage
输入电压
inCurrent
输入电流
outVoltage
输出电压
outCurrent
输出电流

10
directInVoltage
直流输入电压
directInCurrent
直流输入电流
outUa
outUa
outUb
outUb
outUc
outUc
outUab
outUab
outUbc
outUbc
outUac
outUac
outIa
outIa
outIb
outIb
outIc
outIc
outFrequency
频率

12
workMode
工作模式（通风/制冷/加热/除湿）
current
电流
voltage
电压
supplyAirTemp
送风温度
returnAirTemp
回风温度
supplyAirHumidity
送风湿度
returnAirHumidity
回风湿度
filterMachine
过滤器状态
airMachine
风机状态
compressMachine
压缩机状态

13
humidity
湿度

14
hydrogenConcentration
氢气浓度

15
leak
漏水状态