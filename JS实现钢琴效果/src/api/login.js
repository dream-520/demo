import request from '@/utils/request'

export function $login(userinfo) {
  return request({
    method: 'post',
    url: '/gs/sys/login',
    data: userinfo
  })
}

export function $getRsa() {
  return request({
    method: 'post',
    url: '/gs/encrypt/getPublicKey',
  })
}

export function $resetPassword(userinfo ,token) {
  return request({
    method: 'post',
    headers: {
      token: token
    },
    url: '/gs/sys/staff/updatePassword',
    data: userinfo
  })
}

export function $getMenuList(token) {
  return request({
    method: 'post',
    headers: {
      token: token
    },
    url: '/gs/sys/menu/nav',
  })
}

