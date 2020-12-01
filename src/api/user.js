import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/common/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/common/logout',
    method: 'post'
  })
}






















































