import request from '@/utils/request'
export function getDemo(data) {
  return request({
    url: '/bjq/dsbdll',
    method: 'post',
    data
  })
}
//cardType根据卡号查用户信息
export function getRegPerson(data) {
  return request({
    url: '/self/brda/getByCardNoAndCardType',
    method: 'post',
    data
  })
}
//挂号--医保卡
export function getYbPerson(data) {
  return request({
    url: '/self/brda/readPatientMedicareAccountInfo',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//挂号 获取值班类别
export function getZblb(data) {
  return request({
    url: '/self/ksys/getZblb',
    method: 'get',
    data
  })
}
//挂号--获取科室list
export function getKsList(data) {
  return request({
    url: '/self/ksys/ksList',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//根据科室获取医生list
export function getYsList(data) {
  return request({
    url: '/self/ksys/ysList',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//挂号校验
export function getGhCheck(data) {
  return request({
    url: '/self/gh/check',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//医生排班列表
export function getYsPbList(data) {
  return request({
    url: '/self/ksys/ysPbList',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

//获取挂号信息
export function getPayment(data) {
  return request({
    url: '/self/gh/payment',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//生成订单号
export function getCreate(data) {
  return request({
    url: '/self/gh/create',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//预支付生成二维码
export function getPrePay(data) {
  return request({
    url: '/self/pay/prePay',
    method: 'post',
    data,
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
}
//是否支付成功
export function getPayResult(data) {
  return request({
    url: '/self/pay/payResult',
    method: 'post',
    data,
    mask: true,
    headers: {
      'Res-Type':'special'
    }
  })
}
//
// 挂号成功查询
export function getPrint(data) {
  return request({
    url: '/self/gh/print',
    method: 'post',
    data,
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
}

//预约科室查询
export function getYyKsList(data) {
  return request({
    url: '/self/ksys/ksPbList',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//预约医生
export function getYyYsList(data) {
  return request({
    url: '/self/ksys/ysPbList',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//预约校验
export function getYYCheck(data) {
  return request({
    url: '/self/yygh/check',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//预约挂号
export function getReservation(data) {
  return request({
    url: '/self/yygh/reservation',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//预约挂号查询
export function getYyghList(data) {
  return request({
    url: '/self/yygh/list',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//预约取消
export function getYyCancel(data) {
  return request({
    url: '/self/yygh/cancel',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//结算列表查询
export function getMzxxList(data) {
  return request({
    url: '/self/mzxx/list',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//结算查询
export function getMzxxPayment(data) {
  return request({
    url: '/self/mzxx/payment',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//结算预支付
export function getMzxxCreat(data) {
  return request({
    url: '/self/mzxx/create',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//药品明细
export function getDetails(data) {
  return request({
    url: '/self/mzxx/getDetails',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//票据新增
export function getYgpjAdd(data) {
  return request({
    url: '/self/ygpj/add',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//列表
export function getYgpjList(data) {
  return request({
    url: '/self/ygpj/list',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//更新
export function getUpdateSypb(data) {
  return request({
    url: '/self/ygpj/updateSypb',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//删除
export function getRemove(data) {
  return request({
    url: '/self/ygpj/remove',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//截取
export function getInterceptYgpj(data) {
  return request({
    url: '/self/ygpj/interceptYgpj',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//编辑、
export function getEdit(data) {
  return request({
    url: '/self/ygpj/edit',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export function getInfoList(data) {
  return request({
    url: '/self/info/list',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//登录
export function getLogin(data) {
  return request({
    url: '/self/login',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//新增或编辑设备信息
export function getSaveOrUpdate(data) {
  return request({
    url: '/self/equipment/saveOrUpdate',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
//根据ip查询
export function getByIp() {
  return request({
    url: '/self/equipment/getByIp',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}



