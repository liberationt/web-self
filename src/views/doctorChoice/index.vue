<template>
  <steps :stepNum='4'></steps>
  <div class="commonHeight">
    <!-- <div class="regLeft">
     <div class="commonTitle">患者信息</div>
      <div class="leftLable">
        <div>卡号:<span class="lableValue">{{}}</span></div>
        <div>
          类型:<span class="lableValue">{{ personInfo.brxzMc }}</span>
        </div>
        <div>
          姓名:<span class="lableValue">{{ personInfo.brxm }}</span>
        </div>
        <div>
          年龄:<span class="lableValue">{{ personInfo.ages }}</span>
        </div>
        <div>余额:<span class="lableValue money">15</span></div>
      </div>
      <information></information>
    </div> -->
    <div class="regRight">
      <div class="display regtop">
        <div>门诊挂号</div>
        <timer-info></timer-info>
      </div>
      <div class="tableMain">
        <div class="tableRight pl24">
          <div class="dataList">
            <div
              v-for="(item, i) in dataList"
              :key="i"
              class="decItem"
              @click="toPayment(item)"
            >
              <div class="display mt15 pl8">
                <span class="zjBg mr3">专家 </span>
                <span class="money"> ￥{{item.zjje}}</span>
              </div>
              <div class="doc pl8">{{item.ysmc}}({{item.zyjszg}})</div>
              <div class="displayFlex">
                <div class="display">
                  <span class="totileNum mr3">总:</span>
                  <span class="number">{{item.ghxe}}</span>
                </div>
                <div class="display">
                  <span class="totileNum mr3">剩:</span>
                  <span class="number">{{item.ghxe-item.ygrs}}</span>
                </div>
              </div>
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
      params:{}
    })
    //去结算
    const toPayment = (item) => {
      let params = {
        ghks:item.ksdm,
        ghlx:data.params.ghlx,
        ghys:item.ysdm,
        jzkh:data.params.jzkh,
        ksmc:item.ksmc, //后续页面需要
        zblb: data.params.zblb
      }
      ctx.$router.push({
        path:'/registeredPayment',
        query:{
          dataInfo:encodeURIComponent(JSON.stringify(params))
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
      toPayment
    }
  }
};
</script>
<style lang='scss' scoped>
@import '../../styles/common';
.tableRight{
    // width:848px !important;
    .display{
      display: flex;
      align-items: center;
    }
    .zjBg{
      width: 36px;
      height: 18px;
      background: rgba(20, 133, 255, 0.1);
      border-radius: 9px;
      font-size: 12px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #1485FF;
      text-align: center;
      line-height: 18px;
    }
    .money{
      color:#F95776;
      font-size: 18px;
      font-family: Arial-BoldMT, Arial;
      font-weight: 500;
      color: #F95776;
    }
    .doc{
      font-size: 14px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #6A6D78;
      line-height: 21px;
      border-bottom:1px solid #F5F6F8;
      // margin-bottom: 8px;
      padding-bottom: 12px;
    }
    .totileNum{
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #979797;
      line-height: 18px;
    }
    .number{
      font-size: 16px;
      font-family: Arial-BoldMT, Arial;
      font-weight: normal;
      color: #1485FF;
    }
    .displayFlex{
      padding:0 8px;
      display: flex;
      justify-content: space-between;
    }
}
</style>
