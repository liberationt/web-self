<template>
  <steps :stepNum='7'></steps>
  <div class="commonHeight">
    <div class="regRight">
      <div class="display regtop">
        <div>门诊挂号</div>
        <div class="textAlign"><timerInter></timerInter></div>
      </div>
      <div class="regInfo">
        <div class="regtitle">
          <span><i class="el-icon-success"></i></span>
          <span>{{type==1?'预约取号成功！':'挂号成功！'}}</span>
        </div>
        <div class="regLabel">
          <div class="regRow">
            <div class="regRowItem">
              <span class="label">类型:</span>
              <span class="labelValue">{{params.yblx}}</span>
            </div>
            <div>
              <span class="label">就诊科室:</span>
              <span class="labelValue">{{params.ksmc}}</span>
            </div>
          </div>
          <div class="regRow">
            <div class="regRowItem">
              <span class="label">医生:</span>
              <span class="labelValue">{{params.ysmc}}</span>
            </div>
            <div>
              <span class="label">就诊序号:</span>
              <span class="labelValue">{{params.jzxh}}</span>
            </div>
          </div>
          <div class="regRow">
            <div class="regRowItem">
              <span class="label">发票号:</span>
              <span class="labelValue">{{params.jzhm}}</span>
            </div>
            <div>
              <span class="label">总费用:</span>
              <span class="labelNum">{{params.hjje}}</span>
            </div>
          </div>
          <div class="regRow">
            <div class="regRowItem">
              <span class="label">账户支付:</span>
              <span class="labelNum">{{params.grzhzf}}</span>
            </div>
            <div>
              <span class="label">医保支付:</span>
              <span class="labelNum">{{params.xjzf}}</span>
            </div>
          </div>
          <div class="regRow">
            <div class="regRowItem">
              <span class="label">个人支付:</span>
              <span class="labelNum">{{params.xjzf}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div>
    </div>
    <div><bot-button></bot-button></div>
  </div>
</template>
<script>
import steps from "@/components/steps"
import information from "@/components/information"
import { onMounted, reactive, toRefs, getCurrentInstance } from 'vue';
import { getPrint } from "@/api"
export default {
  components: { steps, information },
  setup () {
    const { ctx } = getCurrentInstance()
    const data = reactive({
      params:'',
      type:0
    })
    onMounted(() => {
      data.type = ctx.$route.query.type?ctx.$route.query.type:0
      getPrint({fphm: ctx.$route.query.fphm}).then(res=>{
        data.params = res.data
      })
    })
    return {
      ...toRefs(data)
    }
  }
};
</script>
<style lang='scss' scoped>
@import '../../styles/common';
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
.commonHeight {
  .regInfo {
    .regtitle {
      font-size: 30px;
      color: #0fcaad;
      font-weight: 700;
      text-align: center;
      padding-top: 65px;
    }
    .regLabel {
      padding-left:29%;
      font-size: 22px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #6a6d78;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .regRow {
      display: flex;
      margin-right: 5px;
      margin-top: 24px;
      .label {
        width: 110px;
        display: inline-block;
      }
      .labelValue {
        color: #222b31;
      }
      .labelNum {
        color: #1485ff;
      }
      .regRowItem {
        width: 333px;
      }
    }
  }
}
</style>
