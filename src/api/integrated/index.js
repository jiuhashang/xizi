import request from '@/utils/request'

// 获取用户列表
export function selectList(params) {
  return request({
    url: '/admin/seAdminUser/selectList',
    method: 'get',
    params
  })
}

// 添加账号
export function addOne(params) {
  return request.post('/admin/seAdminUser/addOne', 
  params
  )
}

// 编辑账号
export function updateAccont(params) {
  return request.post('/admin/seAdminUser/updateOne', 
  params
  )
}

// 获取角色列表
export function roleList(params) {
  return request({
    url: '/admin/seAdminRoleInfo/selectList',
    method: 'get',
    params
  })
}

// 删除角色
export function deleteRole(params) {
  return request({
    url: '/admin/seAdminRoleInfo/deleteOne',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params
  })
}

// 获取角色详情
export function getRoleList(params) {
  return request({
    url: '/admin/seAdminRoleInfo/selectOne',
    method: 'get',
    params
  })
}

// 新增角色
export function addRole(params) {
  return request.post('/admin/seAdminRoleInfo/addOne', 
  params
  )
}

// 编辑角色
export function updateOne(params) {
  return request.post('/admin/seAdminRoleInfo/updateOne', 
  params
  )
}

// 下载列表查询
export function selectDownFileList(data, params) {
  return request({
    url: '/admin/seProjectDownFile/selectDownFileList', 
    method: 'post',
    data,
    params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 下载删除
export function deleteDownFileList(params) {
  return request.post('/admin/seProjectDownFile/deleteDownFileList', 
  params
  )
}
