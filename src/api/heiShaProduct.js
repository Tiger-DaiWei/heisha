import request from '@/utils/request'
// 产品接口
export function listProduct(params) {
  // 查询产品
  return request({
    url: '/product/list',
    method: 'get',
    params: params
  })
}

export function updateProduct(params) {
  // 修改产品
  return request({
    url: '/product/update',
    method: 'post',
    params: params
  })
}

export function deleteProduct(params) {
  // 删除产品
  return request({
    url: '/product/delete',
    method: 'post',
    params: params
  })
}

export function creatProduct(params) {
  // 添加产品
  return request({
    url: '/product/create',
    method: 'post',
    params: params
  })
}
// 设备接口
export function deviceList(params) {
  // 查询设备
  return request({
    url: '/device/list',
    method: 'get',
    params: params
  })
}

export function deviceCreate(params) {
  // 注册设备
  return request({
    url: '/device/create',
    method: 'post',
    params: params
  })
}

export function deviceDelete(params) {
  // 删除设备
  return request({
    url: '/device/delete',
    method: 'post',
    params: params
  })
}

export function deviceDisable(params) {
  // 禁用设备
  return request({
    url: 'device/disable',
    method: 'post',
    params: params
  })
}

export function deviceEnable(params) {
  // 启动设备
  return request({
    url: '/device/enable',
    method: 'post',
    params: params
  })
}

export function deviceReset(params) {
  // 重置设备
  return request({
    url: '/device/reset',
    method: 'post',
    params: params
  })
}

// 用户设备
export function userDeviceList(params) {
  // 查询用户设备
  return request({
    url: '/userDevice/list',
    method: 'get',
    params: params
  })
}

export function userDeviceCreate(params) {
  // 绑定设备
  return request({
    url: '/userDevice/create',
    method: 'post',
    params: params
  })
}

export function userDeviceDelete(params) {
  // 解绑设备
  return request({
    url: '/userDevice/delete',
    method: 'post',
    params: params
  })
}

export function invokeServiceDevice(params) {
  // 设备服务调用
  return request({
    url: '/device/invokeServiceDevice',
    method: 'post',
    params: params
  })
}

// 设备事件管理/eventMessage/getDeviceMessage
export function getDeviceMessage(params) {
  // 获取设备状态及属性
  return request({
    url: '/eventMessage/getDeviceMessage',
    method: 'post',
    params: params
  })
}

export function getSysLogList(params) {
  // 获取系统日志
  return request({
    url: '/eventMessage/getSysLogList',
    method: 'post',
    params: params
  })
}

export function getPendingEventMessage(params) {
  // 获取事件列表-每天处理状态
  return request({
    url: '/eventMessage/getPendingEventMessage',
    method: 'post',
    params: params
  })
}

export function getEventMessageDayDetails(params) {
  // 获取事件列表-每天详情
  return request({
    url: '/eventMessage/getEventMessageDayDetails',
    method: 'post',
    params: params
  })
}

export function processEventMessageStatus(params) {
  // 更改事件-已处理
  return request({
    url: '/eventMessage/processEventMessageStatus',
    method: 'post',
    params: params
  })
}

export function selectTree(params) {
  // 查询状态打开的树形数据
  return request({
    url: '/eventTree/selectTree',
    method: 'get',
    params: params
  })
}

export function eventAlarmDelete(params) {
  // 消除接口
  return request({
    url: '/eventAlarm/delete',
    method: 'post',
    params: params
  })
}

// 获取设备状态
export function getDeviceInfo(params) {
  return request({
    url: '/eventMessage/getDeviceInfo',
    method: 'post',
    params: params
  })
}

// 连接状态视图API
export function getLinkview(params) {
  return request({
    url: '/eventMessage/getLinkview',
    method: 'post',
    params: params
  })
}
