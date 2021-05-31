import request from '@/utils/request'
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

