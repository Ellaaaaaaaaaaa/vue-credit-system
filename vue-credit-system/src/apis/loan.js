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