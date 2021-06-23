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
