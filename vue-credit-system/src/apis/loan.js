import request from '@/utils/request' 
//创建贷款申请
export const createLoan = (data) => {
    return request({
        //贷款申请提交接口
        url: '/loan/create',
        method: 'post',
        data,
    })
}
//获取表格数据接口
export const getLoanList = (params) => {
    return request({
        url: '/loan/list',
        method: 'get',
        params
    })
}
//编辑提交接口
export const updateLoan = (data) => {
    return request({
        url: '/loan/update',
        method: 'put',
        data
    })
}
//删除申请接口
export const deleteLoan = (id) => {
    return request({
        url: '/loan/delete/'+id,
        method: 'delete',
    })
}
// 提交审核接口
export const submitApprove = (id) => {
    return request({
        url: '/loan/submitToApprove',
        method: 'post',
        data:{
            id
        }
    })
}