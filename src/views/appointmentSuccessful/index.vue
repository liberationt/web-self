<template>
  <steps :stepList="stepList" :stepNum='7'></steps>
  <div class="commonHeight">
    <div class="regRight">
      <div class="display regtop">
        <div>预约挂号</div>
        <div class="textAlign"><timerInter></timerInter></div>
      </div>
      <div class="regInfo">
        <div class="regtitle">
          <span><i class="el-icon-success"></i></span>
          <span>预约成功！</span>
        </div>
        <div class="regLabel">
          <div class="regRow">
            <div class="regRowItem">
              <span class="label">预约医生:</span>
              <span class="labelValue">{{params.ysmc}}</span>
            </div>
            <div>
              <span class="label">就诊科室:</span>
              <span class="labelValue">{{params.ksdmText}}</span>
            </div>
          </div>
          <div class="regRow">
            <div class="regRowItem">
              <span class="label">就诊序号:</span>
              <span class="labelValue">{{params.jhhm}}</span>
            </div>
            <div>
              <span class="label">预约时间:</span>
              <span class="labelValue">{{params.yyrq}}</span>
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
import { onMounted, reactive, toRefs , getCurrentInstance} from 'vue';
export default {
  components: { steps, information },
  setup () {
    const { ctx } = getCurrentInstance()
    const data = reactive({
      params:'',
      stepList:['挂号','读卡','选择类别','选择科室','选择医生','选择时间','确定预约']
    })
    onMounted(() => {
      data.params = ctx.$route.query.dataInfo ? reactive(JSON.parse(decodeURIComponent(ctx.$route.query.dataInfo))) : {};
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
