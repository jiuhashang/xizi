import request from '@/utils/request'

// 收益测算
export function getProfitMessage(params) {
  return request({
    url: '/admin/seProjectProfitConfig/getProfitMessage',
    method: 'get',
    params
  })
}

// 收益试算
export function putProfitMessage(params) {
  return request.post('/admin/seProjectProfitConfig/putProfitMessage', 
  params
  )
}

// 项目初审
export function projectFirstExamine(params) {
  return request({
    url: '/admin/seProjectInfo/projectFirstExamine',
    method: 'get',
    params
  })
}

// 图纸复核
export function projectSecondExamine(params) {
  return request({
    url: '/admin/seProjectInfo/projectSecondExamine',
    method: 'get',
    params
  })
}