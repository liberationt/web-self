<template>
  <steps :stepList="stepList" :stepNum="5"></steps>
  <div class="commonHeight">
    <div class="regRight">
      <div class="display regtop">
        <div>预约挂号</div>
        <timer-info></timer-info>
      </div>
      <div class="tableMain tableMains">
        <div class="tableRight pl24">
          <div class="dataList">
            <!-- <div
              v-for="(item, i) in dataList"
              :key="i"
              class="decItem"
              @click="toPayment(item)"
            > -->
            <div v-for="item in arrWeek" :key="item.date" class="dateInfo decItem">
              <span class="week">{{item.week}}</span>
              <span class="date">{{item.date}}</span>
            </div>
          </div>
        </div>
        <div class="tableRight pl24">
          <div class="dataList">
            <div v-for="(item,i) in dataList" :key="i" class="decItem" :class="[item.yyxe - item.yyrs ==0 ?'disabledItem':'',item.disabled?'disabledItem':'']" @click="yyInfo(item,i)">
              <div class="ksInfo">
                  <div class="mb15">
                      <span class="title">总:</span>
                      <span>{{item.yyxe ? item.yyxe: 0}}</span>
                  </div>
                  <div>
                      <span class="title">剩:</span>
                      <span>{{item.yyxe - item.yyrs}}</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tableMoney">
        <div class="moneyInfo"></div>
        <div class="nextInfo">
          <!-- <span class="mr10">{{ firstPage }}/{{ lastPage }}</span> -->
          <el-button
            type="primary"
            @click="toNext(1)"
            >上一周</el-button
          >
          <el-button
            type="primary"
            @click="toNext(2)"
            >下一周</el-button
          >
        </div>
      </div>
    </div>
  </div>
  <div class="payDialog">
    <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      width="566px"
    >
      <div class="dialog">
        <div class="title">预约信息</div>
        <div class="lable">
          <span class="label">预约科室: </span>
          <span class="value">{{yyinfo.ksmc}}</span>
        </div>
        <div class="lable">
          <span class="label">预约医生: </span>
          <span class="value">{{yyinfo.ysmc}}</span>
        </div>
        <div class="lable">
          <span class="label">预约时间: </span>
          <span class="value">{{yyinfo.yyrq}}</span>
        </div>
        <div class="payButton" >
          <span class="reg" @click="config">确定预约</span>
          <span class="cancel" @click="dialogVisible=false">取消</span>
        </div>
      </div>
    </el-dialog>
  </div>
  <div>
    <div></div>
    <div><bot-button></bot-button></div>
  </div>
</template>
<script>
import steps from "@/components/steps"
import information from "@/components/information"
import { getCurrentInstance, onMounted, reactive,toRefs } from 'vue';
import timerInfo from "@/components/timer"
import { getYyKsList,getYyYsList,getYYCheck,getReservation } from "@/api/index"
import moment from "moment"
export default {
  components: { timerInfo, steps, information },
  setup () {
    const { ctx } = getCurrentInstance()
    const data = reactive({
      dataList: [],
      firstPage: 1,
      lastPage: 1,
      pageNum: 1,
      params: {},
      timestamp: 0,
      arrWeek:[],
      yearData:[],
      ksList:[],
      dialogVisible:false,
      yyinfo:{},
      type:'',
      stepList:['挂号','读卡','选择类别','选择科室','选择医生','选择时间','确定预约'],
    })
    //去结算
    const toPayment = (item) => {
      let params = {
        ghks: item.ksdm,
        ghlx: data.params.ghlx,
        ghys: item.ysdm,
        jzkh: data.params.jzkh,
        ksmc: item.ksmc //后续页面需要
      }
      ctx.$router.push({
        path: '/registeredPayment',
        query: {
          dataInfo: encodeURIComponent(JSON.stringify(params))
        }
      })
    }
    function handelYsList () {
      //科室
      let params = {
        ...data.params,
        beginDate:data.yearData[0]||'',
        endDate:data.yearData[data.yearData.length-1]||''
      }
      if(data.type==0){
        getYyKsList(params).then(res => {
          if (res.errorCode === 'SUCCESS') {
            let nowDate = new Date(moment().format("YYYY-MM-DD 00:00:00"))
            res.data.map(item=>{
              if(nowDate.getTime() + 24*60*60*1000>new Date(item.ghrq).getTime()){
                item.disabled = true
              }
            })
            data.dataList = res.data
          }
        })
        //医生
      }else if(data.type ==1){
        getYyYsList(params).then(res=>{
          let nowDate = new Date(moment().format("YYYY-MM-DD 00:00:00"))
            res.data.map(item=>{
              if(nowDate.getTime() + 24*60*60*1000>new Date(item.gzrq).getTime()){
                item.disabled = true
              }
            })
            data.dataList = res.data
        })
      }
    }
    //预约校验
    const yyInfo = (item,i)=>{
      console.log(item,11)
      // console.log(item.yyxe - (item.yyrs?item.yyrs:0)===0)
      if(item.yyxe - (item.yyrs?item.yyrs:0) == 0 ||item.disabled) return
      let params = {
        jzkh:data.params.jzkh,
        ksdm:item.ksdm,
        yyrq:data.yearData[i]
      }
      getYYCheck(params).then(res=>{
        if(res.errorCode=='SUCCESS'&&res.data){
          data.yyinfo = {
            ksmc:item.ksmc,
            yyrq:data.yearData[i],
            ysdm:item.ysdm || '',
            ksdm:item.ksdm,
            ysmc:item.ysmc || ''
          }
          data.dialogVisible = true
        }else{
          ctx.$message(res.message)
        }
      })
    }
    //确定预约
    const config = ()=>{
      let params = {
        jzkh: data.params.jzkh,
        ksdm: data.yyinfo.ksdm,
        yyrq: data.yyinfo.yyrq,
        zblb: data.params.zblb
      }
      if( data.type ==1 ){
        params.ysdm = data.yyinfo.ysdm
      }
      getReservation(params).then(res=>{
        if(res.errorCode == 'SUCCESS'){
          ctx.$router.push({
          path:'/appointmentSuccessful',
            query: {
              dataInfo: encodeURIComponent(JSON.stringify(res.data))
            }
        })
        }
      })
    }
    //分页
    const toNext = (val) => {
      data.arrWeek = []
      data.yearData = []
      if (val === 1) {
        data.timestamp -= 24 * 60 * 60 * 1000 * 7
        getCurrent()
        // if (data.pageNum > 1) {
        //   data.pageNum = data.pageNum - 1
        //   handelYsList()
        // }
      } else {
        data.timestamp += 24 * 60 * 60 * 1000 * 7
        getCurrent()
      }
    }
    //获取当前时间
    const getCurrent = () => {
      // data.timestamp = new Date().getTime()
      const week = new Date(data.timestamp).getDay() // 今天是星期几（0~6）
      const sunday = data.timestamp - 24 * 60 * 60 * 1000 * week // 第一天的时间戳
      for (let i = 0; i < 7; i++) {
        var day = sunday + 24 * 60 * 60 * 1000 * (i+1)
        var dateStr = parseTime(day,'{m}-{d},{a}')
        data.arrWeek.push({ date: dateStr.split(',')[0], week: dateStr.split(',')[1] })
        var dateyear = getYearData(day,'{y}-{m}-{d},{a}')
        data.yearData.push(dateyear.split(',')[0])
      }
      handelYsList()
    }
    const parseTime = (time,cFormat)=> {
      const format = cFormat || '{m}-{d}'
      let date=null
      if (typeof time === 'object') {
        date = time
      } else {
        if (typeof time === 'string') {
          if (/^[0-9]+$/.test(time)) {
            time = parseInt(time)
          } else {
            time = time.replace(new RegExp(/-/gm), '/')
          }
        }
        if (typeof time === 'number' && time.toString().length === 10) {
          time = time * 1000
        }
        date = new Date(time)
      }
      const formatObj = {
        m: date.getMonth() + 1,
        d: date.getDate(),
        a: date.getDay(),
        b: date.getHours() < 12 ? 1 : 2
      }
      const timeStr = format.replace(/{([ymdhisab])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
          return ['周日','周一', '周二', '周三', '周四', '周五', '周六'][value]
        }
        if (key === 'b') {
          return value.toString()
        }
        return value.toString().padStart(2, '0')
      })
      return timeStr
    }
     //获取当前时间
    const getYearData = (time,cFormat)=> {
      const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
      let date=null
      if (typeof time === 'object') {
        date = time
      } else {
        if (typeof time === 'string') {
          if (/^[0-9]+$/.test(time)) {
            time = parseInt(time)
          } else {
            time = time.replace(new RegExp(/-/gm), '/')
          }
        }
        if (typeof time === 'number' && time.toString().length === 10) {
          time = time * 1000
        }
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
        b: date.getHours() < 12 ? 1 : 2
      }
      const timeStr = format.replace(/{([ymdhisab])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
          return ['周日','周一', '周二', '周三', '周四', '周五', '周六'][value]
        }
        if (key === 'b') {
          return value.toString()
        }
        return value.toString().padStart(2, '0')
      })
      return timeStr
    }
    onMounted(() => {
      data.params = ctx.$route.query.dataInfo ? reactive(JSON.parse(decodeURIComponent(ctx.$route.query.dataInfo))) : {};
      data.type = ctx.$route.query.type ? ctx.$route.query.type : 0
      data.timestamp = new Date().getTime()
      getCurrent()
    })
    
    return {
      ...toRefs(data),
      toPayment,
      yyInfo,
      config,
      toNext
    }
  }
};
</script>
<style lang='scss' scoped>
// @import '../../styles/common';
.tableMains{
    display: block;
}
.tableRight {
    .dateInfo{
        position: relative;
        text-align: center;
    }
    .week{
        position: absolute;
        right:0;
        top:0;
        background: rgba(20, 133, 255, 0.1);
        border-radius: 0px 0px 0px 8px;
        padding:5px 10px;
        font-size: 12px;
        color:#1485FF;
    }
    .date{
        line-height:106px;
        color:#222B31;
        font-size: 20px;
    }
    .ksInfo{
        display: flex;
        height:100%;
        flex-direction: column;
        justify-content: center;
        padding-left:15px;
        div{
            display: flex;
            align-items: center;
        }
        span{
            color:#1485FF;
            font-size:18px;
        }
        .title{
           font-size: 14px;
           color:#6A6D78;
        }
    }
    .disabledItem{
      span{
            color:#D3D5E2;
            font-size:18px;
        }
        .title{
           font-size: 14px;
           color:#D3D5E2;
        }
    }
}
.regRight {
    width: 1232px;
    height: 728px;
    background: #fff;
    .regtop {
        justify-content: space-between;
        height: 56px;
        font-size: 24px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #222b31;
        line-height: 56px;
        border-bottom: 1px solid #f0f0f0;
        margin: 0 24px;
        .option {
            color: #6a6d78;
            font-size: 20px;
        }
    }
    .tableMain {
        height: 565px;
        padding: 16px 24px 16px 0;
        overflow: auto;
        .dateInfo {
            margin-right: 16px;
            div {
                height: 76px;
                background: linear-gradient(90deg, #EAECEB 0%, #FDFDFD 100%);
                border-radius: 0px 10px 10px 0px;
                margin-bottom: 2px;
                text-align: center;
                color: #222B31;
                font-size: 22px;
                padding: 0 10px;
                width: 22px;
                padding-top: 10px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                border: 1px solid #E2E6E8;
            }
        }
    }

    .tableMoney {
        margin:0 24px;
        height: 74px;
        border-top: 1px solid #F0F0F0;
        // padding: 0 24px;
        font-size: 22px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #6A6D78;
        line-height: 33px;
        display: flex;
        justify-content: space-between;
        .moneyInfo {
            display: flex;
            align-items: center;

            .redColor {
                color: #E80F0F;
                font-weight: 500;
                font-size: 26px;
            }
        }
        .nextInfo {
            display: flex;
            align-items: center;
        }
    }
    .dataList {
        display: flex;
        flex-wrap: wrap;
        .tebleItem {
            width: 132px;
            height: 78px;
            background: rgba(243, 246, 250, 0.3);
            border-radius: 4px;
            border: 1px solid #D3D5E2;
            margin-bottom: 20px;
            font-size: 18px;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 500;
            color: #222B31;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-right:22px;
        }
        .tebleItem:nth-of-type(5n){
            margin-right:0;
        }
        .decItem{
            width: 152px;
            height: 104px;
            background: rgba(243, 246, 250, 0.3);
            border-radius: 4px;
            border: 1px solid #D3D5E2;
            margin-bottom: 20px;
            font-size: 18px;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 500;
            color: #222B31;
            margin-right:17px;
        }
        .disabledItem{
          background: #F5F6F8;
          color:#D3D5E2;
        }
        .decItem:nth-of-type(7n){
            margin-right:0;
        }
    }
}
.dialog{
  padding: 40px 0;
  .title{
    text-align: center;
    font-size: 28px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #222B31;
    margin-bottom: 55px;
  }
  .lable{
    padding-left: 60px;
    font-size: 20px;
    margin-bottom: 32px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
  }
  .label{
    color:#6A6D78;
  }
  .value{
    color:#222B31;
  }
  .payButton{
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-self: center;
    .reg{
      height: 46px;
      background: linear-gradient(180deg, #2DBBFF 0%, #1485FF 100%);
      border-radius: 4px;
      font-size: 22px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 46px;
      padding:0 15px;
      margin-right: 30px;
    }
    .cancel{
      height: 46px;
      border-radius: 4px;
      font-size: 22px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #4d4747;
      line-height: 46px;
      padding:0 15px;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
