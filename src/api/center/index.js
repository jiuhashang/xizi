import request from '@/utils/request'

// 收益测算
export function getProfitMessage(params) {
  return request({
    url: '/admin/seProjectProfitConfig/getProfitMessage',
    method: 'get',
    params
  })
}