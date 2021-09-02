<template>
  <steps :stepNum="2" :stepList="stepList"></steps>
  <div class="commonHeight">
    <div class="timerHeight"><timerInter></timerInter></div>
    <div class="cardList">
      <div v-for="(item, i) in cardList" :key="item.icon" class="cardItem">
        <div class="cardImg">
          <img :src="item.url" alt="">
        </div>
        <div class="itemLabel" @click="toReg(item.type)">
          <span class="iconImg">
            <img :src="item.icon" alt="" />
          </span>
          <span class="label"
            >{{ item.label }}
            <span class="inputInfo" v-if="i === 0"
              ><el-input
                v-model="cardNo"
                @keyup.enter="jzkhEnter"
                placeholder="请输入内容"
                :ref="inputRef"
              ></el-input></span
          ></span>
        </div>
      </div>
    </div>
  </div>
  <div>
    <bot-button :num="444"></bot-button>
  </div>
  <dialogs :dialogInfo="dialogInfo" :closeDialog = 'closeDialog'  v-if="isShow"></dialogs>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { getRegPerson, getYbPerson } from "@/api"
import { useRouter } from 'vue-router'
import { personInfo } from "@/common/persion"
export default {
  setup () {
    const { ctx } = getCurrentInstance()
    const cardList = reactive([
      {
        path: '',
        type: '1',
        url: require("../../assets/img/ybk.png"),
        icon: require("../../assets/img/yibaoka.png"),
        label: '医保卡'
      },
      {
        path: '',
        type: '2',
        url: require("../../assets/img/jkk.png"),
        icon: require("../../assets/img/jiankangka.png"),
        label: '健康卡'
      },
      {
        path: '',
        type: '3',
        url: require("../../assets/img/sfz.png"),
        icon: require("../../assets/img/shenfenzheng.png"),
        label: '身份证'
      }
    ])
    const router = useRouter()
    const data =reactive({
      stepList:[]
    })
    let cardType = ref()
    //配置信息
    let dialogInfo = reactive({})
    const dataInfo = reactive(personInfo)
    //就诊卡号
    let cardNo = ref('0218304')
    //隐藏的输入框
    let inputNum = ''
    //是否展示弹框
    let isShow = ref(false)
    const inputRef = el => {
      inputNum = el
    }
    function closeDialog(){
      isShow.value = false
      inputNum.focus()
    }
    //刷磁条卡
    function jzkhEnter () {
      let params = {
        cardNo: cardNo.value,
        cardType: 1
      }
      // if(cardType.value ===2)
      getRegPerson(params).then(res => {
        if(res.errorCode==='SUCCESS'){
          if(cardType.value ==2){
            ctx.$router.push({
              path: '/outpatientRegistration',
              query: {
                persion: encodeURIComponent(JSON.stringify(res.data))
              }
            })
          }else if(cardType.value ==3){
            ctx.$router.push({
              path: '/outpatientPayment',
              query: {
                persion: encodeURIComponent(JSON.stringify(res.data))
              }
            })
          }else if(cardType.value==5){
            ctx.$router.push({
              path: '/appointmentDepartment',
              query: {
                persion: encodeURIComponent(JSON.stringify(res.data))
              }
            })
          }else if(cardType.value == 6 ){
            ctx.$router.push({
              path: '/appointmentNumber',
              query: {
                persion: encodeURIComponent(JSON.stringify(res.data))
              }
            })
          }
        }
      })
    }
    function toReg (num) {
      switch (num) {
        case '1':
          getYbInfo()
          break
        case '2':
          dialogInfo.title = '提示信息'
          dialogInfo.text = '磁条卡请直接刷卡'
          dialogInfo.button = "OK"
          isShow.value = true
          break
        case '3':
          break

      }
    }
    function getYbInfo () {
      let params = {
        cardNo: cardNo.value,
        cardType: 1
      }
      getYbPerson(params).then(res => {
        console.log(res, 55)
      })
      // if(ctx.$route.query.type == 2){
      //   ctx.$router.push({
      //     path:'/outpatientRegistration',
      //   })
      // }else if(ctx.$route.query.type == 5){
      //   ctx.$router.push({
      //     path:'/appointmentDepartment',
      //   })
      // }
    }
    onMounted(() => {
      cardType.value = ctx.$route.query.type
      if(cardType.value ==2){
        data.stepList = ['挂号','读卡','选择类别','选择科室','选择医生','付款','确认挂号']
      }else if(cardType.value==3){
        data.stepList = ['缴费','读卡','选择类别','缴费','付款']
      } else if(cardType.value == 5){
        data.stepList = ['预约挂号','读卡','选择类别','选择科室','选择医生','选择时间','确定预约']
      }else if(cardType.value == 6){
        data.stepList = ['预约取号','读卡','选择类别','选择预约','付款','确定挂号']
      }
      inputNum.focus()
    })
    const dataInfoRef = toRefs(dataInfo)
    return {
      ...toRefs(data),
      cardList,
      cardNo,
      dialogInfo,
      isShow,
      closeDialog,
      inputRef,
      jzkhEnter,
      toReg,
      ...dataInfoRef
    }
  }
};
</script>
<style lang='scss' scoped>
.commonHeight {
  .cardList {
    display: flex;
    background: #fff;
    justify-content: center;
    align-items: center;
    .cardItem {
      margin: 120px 50px 140px;
      .cardImg {
        width: 260px;
        height: 260px;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 24px;
      }
      .itemLabel {
        width: 260px;
        height: 120px;
        background: linear-gradient(360deg, #eaeceb 0%, #ffffff 100%);
        box-shadow: 0px 4px 10px 0px #c4c8cc;
        border-radius: 10px;
        border: 1px solid #e2e6e8;
        display: flex;
        align-items: center;
        .iconImg {
          margin-left: 30px;
          margin-right: 14px;
        }
        .label {
          font-size: 24px;
          font-weight: 800;
          color: #1485ff;
        }
      }
      .inputInfo {
        position: absolute;
        z-index: -1;
      }
    }
  }
}
</style>
