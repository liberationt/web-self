
<template>
  <steps :stepList='stepList' :stepNum="3"></steps>
  <div class="commonHeight">
    <div class="regLeft">
      <information :personInfo="personInfo"></information>
    </div>
    <div class="regRight regRights">
      <div class="display regtop">
        <div>预约挂号</div>
        <timer-info></timer-info>
      </div>
      <div class="tableMain">
        <div class="dateInfo">
          <div v-for="item in timerList" :key="item.value" @click="timerClick(item.value)" :class="timeIndex==item.value?'bgColor':''">{{item.label}}</div>
        </div>
        <div class="tableRight">
          <div class="display mb20">
            <div v-for="item in typeList" :key="item.value" @click="typeClick(item.value)" :class="indexType==item.value?'typesColor':'typeColor'">{{item.label}}</div>
          </div>
          <div class="dataList">
            <div v-for="(item,i) in tableData.list" :key="i" class="tebleItem" @click="toChooseTime(item)"><span>{{item.ksmc}}</span></div>
          </div>
        </div>
      </div>
			<div class="tableMoney">
				<div class="moneyInfo">
				</div>
				<div class="nextInfo">
					<span class="mr10">{{pageNum}}/{{lastPage}}</span>
					<el-button type="primary" :disabled="firstPage==pageNum" @click="toNext(1)">上一页</el-button>
					<el-button type="primary" :disabled="lastPage==pageNum"  @click="toNext(2)">下一页</el-button>
				</div>
			</div>
    </div>
  </div>
  <bot-button :num="111122"></bot-button>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import timerInfo from "@/components/timer"
import information from "@/components/information"
import { getKsList,getZblb } from "@/api"
import moment from "moment"

export default {
  components:{timerInfo,information},
  setup () {
    const { ctx } = getCurrentInstance()
    const data = reactive({
      timerList:[
        {
          label:'上午',
          value:1000006
        },
        {
          label:'下午',
          value:1000008
        },
        {
          label:'晚上',
          value:1000009
        }
      ],
      typeList:[
        {
          label:'普通预约',
          value:0
        },
        {
          label:'专家预约',
          value:1
        },
        {
          label:'特需预约',
          value:2
        }
      ],
      stepList:['挂号','读卡','选择类别','选择科室','选择医生','选择时间','确定预约'],
      timeIndex:1000006,
      indexType:0,
      firstPage:1,
      lastPage:1,
      pageNum:1,
      tableData:[],
      personInfo:{}
    })
    //时间切换
    const timerClick=(val)=>{
      data.pageNum = 1
      data.timeIndex = val
      handelKsList()
    }
    //科室切换
    const typeClick=(val)=>{
      data.pageNum = 1
      data.indexType = val
      handelKsList()
    }
    //专家选择医生
    const toChooseTime=(item)=>{
      //普通预约
      if(data.indexType===0){
        let params = {
          cxlx: data.indexType,
          zblb: data.timeIndex,
          ksdm:item.ksdm,
          jzkh:data.personInfo.jzkh,
          yslx:data.indexType
        }
        ctx.$router.push({
          path:'/appointmentTime',
          query: {
            dataInfo: encodeURIComponent(JSON.stringify(params))
          }
        }) 
      //专家预约
      }else if(data.indexType===1){
        let params = {
          cxlx: data.indexType,
          ksdm: item.ksdm,
          zblb: data.timeIndex,
          jzkh:data.personInfo.jzkh, //也不是必传 后续需要
        }
        ctx.$router.push({
          path:'/appointmentDoctor',
          query: {
            dataInfo: encodeURIComponent(JSON.stringify(params))
          }
        }) 
      }else{
        console.log(3)
      }

    }
    //分页
    const toNext = (val)=>{
      if(val===1){
        if(data.pageNum>1){
          data.pageNum = data.pageNum-1
          handelKsList()
        }
      }else{
        if(data.pageNum<data.lastPage){
          data.pageNum = data.pageNum+1
          handelKsList()
        }
      }
    }
    //获取科室
    const handelKsList = () =>{
      let beginDate = moment(new Date().getTime() + 24*60*60*1000).format("YYYY-MM-DD")
      let endDate = moment(new Date().getTime() + 24*7*60*60*1000).format("YYYY-MM-DD")
       let params = {
         beginDate:beginDate,
         endDate:endDate,
         cxlx:data.indexType, // 0-普通 1-专家
         zblb:data.timeIndex, //上下晚
         pageNum:data.pageNum, //当前页码数
         pageSize:25
       }
       getKsList(params).then(res=>{
         if(res.errorCode=='SUCCESS'){
            data.tableData.list = res.data.list
            data.firstPage = res.data.firstPage
            data.lastPage = res.data.lastPage
         }
       })
    }
    //获取值班类别
    const handelZblb = ()=>{
      getZblb({}).then(res=>{
        let arrList = [1000006,1000008,1000009]
        if(arrList.includes(res.data)){
          data.timeIndex= res.data
        }else{
          data.timeIndex = 1000006
        }
        handelKsList()
      })
    }
    onMounted(async ()=>{
      data.personInfo = ctx.$route.query.persion ? reactive(JSON.parse(decodeURIComponent(ctx.$route.query.persion))) : {};
      await handelZblb()
    })
    return{
      ...toRefs(data),
      timerClick,
      typeClick,
      toChooseTime,
      toNext
    }
  }
};
</script>
<style lang='scss' scoped>
@import '../../styles/common'
</style>
