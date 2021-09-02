<template>
  <steps :stepList="stepList" :stepNum="stepNum"></steps>
	<div class="commonHeight">
    <div class="regLeft">
      <information :personInfo="personInfo"></information>
    </div>
    <div class="regRight regRights">
      <div class="display regtop">
        <div>预约取号</div>
        <div class="textAlign"><timerInter></timerInter></div>
      </div>
			<div class="tableMoney">
				<!-- <div class="moneyInfo">
				</div> -->
				<div class="nextInfo">
					共预约 {{tableData.length || 0}} 项，选择需要取号的预约信息
				</div>
			</div>
      <div class="tableMain">
        <el-table :data="tableData" stripe style="width: 100%;margin-left:24px">
          <el-table-column prop="ksdmText" align="center" label="预约科室">
          </el-table-column>
          <el-table-column prop="ysmc" align="center" label="预约医生">
          </el-table-column>
          <el-table-column prop="address" align="center" label="预约时间"> 
            <template #default="{row}">
              <div>
                <span>{{row.yyrq}}  {{row.sdmc}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="jhhm" align="center" label="预约号码"> </el-table-column>
          <el-table-column align="center" label="操作"> 
            <template #default="{row}">
              <div class="qh">
                <span style="color:#F95776" @click="toQh(row)">取号</span>
                <span class="ml30" @click="cancle(row)">取消</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="dateInfo">
          <div v-for="item in timerList" :key="item.value" @click="timerClick(item.value)" :class="timeIndex==item.value?'bgColor':''">{{item.label}}</div>
        </div>
        <div class="tableRight">
          <div class="display mb20">
            <div v-for="item in typeList" :key="item.value" @click="typeClick(item.value)" :class="indexType==item.value?'typesColor':'typeColor'">{{item.label}}</div>
          </div>
          <div class="dataList">
            <div v-for="(item,i) in tableData.list" :key="i" class="tebleItem" @click="toDoc(item)"><span>{{item.ksmc}}</span></div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
  <bot-button :num="111122"></bot-button>
</template>
<script>
import { getYyghList,getGhCheck } from "@/api"
import information from "@/components/information"
import { reactive, toRefs,onMounted,getCurrentInstance } from 'vue';
export default {
  components:{information},
  setup () {
    const { ctx } = getCurrentInstance()
		const data = reactive({
			stepList:['预约取号','读卡','选择类别','选择预约','付款','确定挂号'],
			stepNum:3,
      tableData:[],
		})
    const getYyList = ()=>{
      let params = {
        jzkh:'0218304'
      }
      getYyghList(params).then(res=>{
        if(res.errorCode=='SUCCESS'){
          data.tableData = res.data
        }
      })
    }
    const cancle = (row)=>{
      getYyCancel({yyxh:row.yyxh}).then(res=>{
        if(res.errorCode == 'SUCCESS'){

        }
      })
    }
    //取号
    const toQh =(row)=>{
      let params ={
        ghks: row.ksdm,
        ghlx: 0,
        jzkh: row.jzkh,
        zblb: row.zblb
      }
      let origin = {
        ...params,
        ksmc: row.ksdmText,
        ghys:row.ysdm,
        yyxh:row.yyxh
      }
      getGhCheck(params).then(res=>{
        if(res.errorCode == 'SUCCESS'){
          ctx.$router.push({
            path:'/registeredPayment',
            query: {
              dataInfo: encodeURIComponent(JSON.stringify(origin)),
              type:1
            }
          }) 
        }else{
          ctx.$message(res.message)
        }
      })
    }
    let personInfo = ctx.$route.query.persion ? reactive(JSON.parse(decodeURIComponent(ctx.$route.query.persion))) : {};
    onMounted(() => {
      getYyList()
    })
    return {
      personInfo,
			...toRefs(data),
      toQh
    }
  }

};
</script>
<style lang='scss' scoped>
	@import '../../styles/common';
  .qh{
    display: flex;
    justify-content: center;
  }
</style>
