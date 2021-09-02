
<template>
  <steps :stepList="stepList" :stepNum='stepNum'></steps>
  <div class="mainContent">
    <div class="regRight">
      <div class="display regtop">
        <div>门诊挂号</div>
        <div class="textAlign"><timerInter></timerInter></div>
      </div>
      <div class="tableMain">
        <div class="payMain">
          <div class="ksmc">{{ksmc}}</div>
          <div class="display">
            <div class="mb30">
              <span class="label">还需个人付款 : </span>
              <span class="money moneys">{{payInfo.ysk}} 元</span>
            </div>
            <div>
              <span class="label labels">医保支付 : </span>
              <span class="money">{{payInfo.qtys}} 元</span>
            </div>
          </div>
          <div class="display">
            <div>
              <span class="label">优惠金额 : </span>
              <span class="money">{{payInfo.jmje}} 元</span>
            </div>
            <div>
              <span class="label labels">本次费用 : </span>
              <span class="money">{{payInfo.zjje}} 元</span>
            </div>
          </div>
          <div class="payType">请选择支付方式</div>
          <div class="payStyle">
            <div @click="payMoney(1)">
              <span><img src="@/assets/img/zhifubao.png" alt="" /></span>
              <span>微信</span>
            </div>
            <div @click="payMoney(2)">
              <span><img src="@/assets/img/weixin.png" alt="" /></span>
              <span>支付宝</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div></div>
    <div><bot-button :imgList="imgList"></bot-button></div>
  </div>
  <div class="payDialog">
    <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      width="566px"
    >
      <div class="dialog">
        <div class="payInfo">
          <span>支付金额:</span>
          <span>{{payInfo.ysk}}元</span>
        </div>
        <div class="payTitle">请用微信扫一扫功能，扫描下方二维码进行支</div>
        <div class="qrImg">
          <div id="qrcode" ref="qrCodeUrl"></div>
        </div>
        <div class="payButton" @click="payMoney(3)">取消支付</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import steps from "@/components/steps"
import QRCode from 'qrcodejs2'
import { nextTick, onMounted, reactive, ref,getCurrentInstance, toRefs, onBeforeUnmount } from 'vue';
import {getPayment,getCreate,getPrePay,getPayResult} from "@/api/index"
export default {
  components: { steps },
  setup () {
    const { ctx } = getCurrentInstance()
    const data = reactive({
      payInfo:{},
      params:{},
      stepList:['挂号','读卡','选择类别','选择科室','选择医生','付款','确认挂号'],
      stepNum:5,
      ksmc:'',
      timer:'',
      out_trade_no:'',
      imgList:[{
        url:require("../../assets/img/syb.png")
      }]
    })
    let dialogVisible = ref(false)
    let qrCodeUrl = ref(null);
    function product(url){
      new QRCode(qrCodeUrl.value, {
          text: url, // 需要转换为二维码的内容
          width: 190,
          height: 190,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
      })
    }
    function payMoney(num){
      // ctx.$router.push('/successfulRegistration')
      if(num==1){
        let params = {
          ...data.payInfo,
          ghks:data.params.ghks,
          ghlx:data.params.ghlx,
          zblb:data.params.zblb,
          jzkh:data.params.jzkh
        }
        if(data.params.ghys){
          params.ghys=data.params.ghys
        }
        if(ctx.$route.query.type){
          params.yybz = 1
          params.yyxh = data.params.yyxh
        }else{
          params.yybz = 0
          params.yyxh = 1
        }
        //预支付生成订单号
        getCreate(params).then(res=>{
          if(res.errorCode=='SUCCESS'){
            data.out_trade_no = res.data
            let origin = {
              out_trade_no:res.data,
              total_fee:data.payInfo.ysk * 100
            }
            //生成二维码链接
            getPrePay(origin).then(res=>{
              dialogVisible.value = true
               nextTick(()=>{
                qrCodeUrl.value.innerHTML = ""
                product(res.data)
                data.timer = setInterval(()=>{
                  paySuccess()
                },1000)
              })
            })
          }
        })
      }else if(num ==2){
        dialogVisible.value = true
        nextTick(()=>{
          qrCodeUrl.value.innerHTML = ""
          product()
        })
      }else{
        dialogVisible.value = false
        data.out_trade_no = ''
        clearInterval(data.timer)
        data.timer = null
        nextTick(()=>{
          qrCodeUrl.value.innerHTML = ""
        })
      }
    }
    const paySuccess =()=>{
      getPayResult({outTradeNo:data.out_trade_no}).then(res=>{
        if(res.data&&res.errorCode =='SUCCESS'){
          clearInterval(data.timer)
          data.timer = null
          if(ctx.$route.query.type){
            ctx.$router.push(`/successfulRegistration?fphm=${res.data}&type=1`)
          }else{
            ctx.$router.push(`/successfulRegistration?fphm=${res.data}`)
          }
        }
      })
    }
    //获取data信息 --- 挂号
    function getData(){
      data.params = ctx.$route.query.dataInfo ? reactive(JSON.parse(decodeURIComponent(ctx.$route.query.dataInfo))) : {};
      data.ksmc = data.params.ksmc
      getPayment(data.params).then(res=>{
        if(res.errorCode=='SUCCESS'){
          data.payInfo = res.data  
        }
      })
    }
    //获取data信息 --- 取号
    onMounted(() => {
      if(ctx.$route.query.type){
        data.stepList = ['预约取号','读卡','选择类别','选择预约','付款','确定挂号']
        data.stepNum = 4
      }else{
      }
      getData()
      console.log(data.ksmc,9999)
    })
    onBeforeUnmount(()=>{
      clearInterval(data.timer)
      data.timer = null
    })
    return {
      qrCodeUrl,
      ...toRefs(data),
      dialogVisible,
      payMoney
    }
  }
};
</script>
<style lang='scss' scoped>
.mainContent {
  display: flex;
  justify-content: space-between;
  width: 1232px;
}
.regLeft {
  width: 328px;
  height: 728px;
  background: #fff;
  padding: 0 16px;
  h3 {
    font-size: 24px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #222b31;
    line-height: 56px;
    height: 56px;
    border-bottom: 1px solid #f0f0f0;
  }
  .leftLable {
    padding: 0 8px;
    div {
      margin-top: 30px;
      font-size: 22px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #6a6d78;
      .lableValue {
        color: #222b31;
        padding-left: 10px;
      }
      .money {
        color: #1485ff;
      }
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
    // padding-bottom: 14px;
    .option {
      color: #6a6d78;
      font-size: 20px;
    }
  }
  .tableMain {
    height: 565px;
    padding: 16px 24px 16px 0;
    overflow: auto;
    .el-table td,
    .el-table th.is-leaf {
      border-bottom: none !important;
    }
    .payMain {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .ksmc {
        font-size: 28px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #0fcaad;
        margin-top: 63px;
        margin-bottom: 45px;
      }
      .display {
        div {
          width: 260px;
          .label {
            font-size: 22px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #6a6d78;
            width: 150px;
            display: inline-block;
          }
          .labels {
            width: 110px;
          }
          .money {
            font-size: 22px;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 500;
            color: #1485ff;
          }
          .moneys {
            color: #f95776;
          }
        }
      }
      .payType {
        font-size: 24px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #222b31;
        margin: 45px 0 30px;
      }
      .payStyle {
        display: flex;
        justify-content: center;
        align-items: center;
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 182px;
          height: 114px;
          background: rgba(243, 246, 250, 0.3);
          border-radius: 4px;
          border: 1px solid #d3d5e2;
          margin-right: 32px;
          font-size: 18px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #222b31;
          line-height: 27px;
        }
      }
    }
  }
  .tableMoney {
    height: 74px;
    border-top: 1px solid #f0f0f0;
    padding: 0 24px;
    font-size: 22px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #6a6d78;
    line-height: 33px;
    display: flex;
    justify-content: space-between;
    .moneyInfo {
      display: flex;
      align-items: center;
      .redColor {
        color: #e80f0f;
        font-weight: 500;
        font-size: 26px;
      }
    }
    .nextInfo {
      display: flex;
      align-items: center;
    }
  }
}
.dialog{
  width: 566px;
  height: 440px;
  border-radius: 8px;
  padding-top:20px
}
.payInfo {
  font-size: 28px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 500;
  color: #222b31;
  text-align: center;
}
.payTitle {
  font-size: 18px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #6a6d78;
  margin: 24px auto 30px;
  text-align: center;
}
.payButton {
  width: 120px;
  height: 46px;
  background: linear-gradient(180deg, #f95776 0%, #ed657f 100%);
  border-radius: 4px;
  font-size: 22px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  line-height: 46px;
  margin: 0 auto;;
}
.qrImg{
  text-align: center;
  margin-bottom: 30px;
}
#qrcode{
  width:190px;
  height:190px;
  padding:5px;
  margin:0 auto;
  display: inline-block;
  border:1px solid #F0F0F0;
  img {
      width: 132px;
      height: 132px;
      background-color: #fff; //设置白色背景色
      padding: 6px; // 利用padding的特性，挤出白边
      box-sizing: border-box;
  }
}
</style>
