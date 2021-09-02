<template>
  <steps :stepList="stepList" :stepNum = "4"></steps>
  <div class="commonHeight">
    <div class="regRight">
      <div class="display regtop">
        <div>预约挂号</div>
        <timer-info></timer-info>
      </div>
      <div class="tableMain">
        <div class="tableRight pl24">
          <div class="dataList">
            <div
              v-for="(item, i) in dataList"
              :key="i"
              class="decItem"
              @click="toAppointmentTime(item)"
            >
              <div class="dicName">{{item.ysmc}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tableMoney">
        <div class="moneyInfo"></div>
        <div class="nextInfo">
          <span class="mr10">{{firstPage}}/{{lastPage}}</span>
          <el-button type="primary" :disabled="firstPage==pageNum"  @click="toNext(1)">上一页</el-button>
          <el-button type="primary" :disabled="lastPage==pageNum"  @click="toNext(2)">下一页</el-button>
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
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import timerInfo from "@/components/timer"
import { getYsList } from "@/api/index"
export default {
  components: { timerInfo,steps,information },
  setup () {
    const { ctx } = getCurrentInstance()
    const data = reactive({
      dataList:[],
      firstPage:1,
      lastPage:1,
      pageNum:1,
      params:{},
      stepList:['挂号','读卡','选择类别','选择科室','选择医生','选择时间','确定预约']
    })
    //去结算
    const toAppointmentTime = (item) => {
      let params = {
        ...data.params,
        ysdm:item.ysdm
      }
      ctx.$router.push({
        path:'/appointmentTime',
        query:{
          dataInfo:encodeURIComponent(JSON.stringify(params)),
          type:1
        }
      })
    }
    function handelYsList(){
      let params = {
        ...data.params,
        pageNum:data.pageNum,
        pageSize:28
      }
      getYsList(params).then(res=>{
        if(res.errorCode==='SUCCESS'){
          data.dataList = res.data.list
          data.firstPage = res.data.firstPage
          data.lastPage = res.data.lastPage
        }
      })
    }
    //分页
    const toNext = (val)=>{
      if(val===1){
        if(data.pageNum>1){
          data.pageNum = data.pageNum-1
          handelYsList()
        }
      }else{
        if(data.pageNum<data.lastPage){
          data.pageNum = data.pageNum+1
          handelYsList()
        }
      }
    }
    onMounted(() => {
      data.params = ctx.$route.query.dataInfo ? reactive(JSON.parse(decodeURIComponent(ctx.$route.query.dataInfo))) : {};
      handelYsList()
    })
    return {
      ...toRefs(data),
      toAppointmentTime
    }
  }
};
</script>
<style lang='scss' scoped>
@import '../../styles/common';
.tableRight{
    .dicName{
      text-align: center;
      line-height:104px;
    }
}
</style>
