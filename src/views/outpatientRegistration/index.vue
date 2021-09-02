
<template>
  <steps :stepNum="3"></steps>
  <div class="commonHeight">
    <div class="regLeft">
      <information :personInfo="personInfo"></information>
    </div>
    <div class="regRight regRights">
      <div class="display regtop">
        <div>门诊挂号</div>
        <div class="textAlign"><timerInter></timerInter></div>
      </div>
      <div class="tableMain">
        <div class="dateInfo">
          <div
            v-for="item in timerList"
            :key="item.value"
            @click="timerClick(item.value)"
            :class="timeIndex == item.value ? 'bgColor' : ''"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="tableRight">
          <div class="display mb20">
            <div
              v-for="item in typeList"
              :key="item.value"
              @click="typeClick(item.value)"
              :class="indexType == item.value ? 'typesColor' : 'typeColor'"
            >
              {{ item.label }}
            </div>
          </div>
          <div class="dataList">
            <div
              v-for="(item, i) in tableData.list"
              :key="i"
              class="tebleItem"
              @click="toDoc(item)"
            >
              <span>{{ item.ksmc }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tableMoney">
        <div class="moneyInfo"></div>
        <div class="nextInfo">
          <span class="mr10">{{ pageNum }}/{{ lastPage }}</span>
          <el-button
            type="primary"
            :disabled="firstPage == pageNum"
            @click="toNext(1)"
            >上一页</el-button
          >
          <el-button
            type="primary"
            :disabled="lastPage == pageNum"
            @click="toNext(2)"
            >下一页</el-button
          >
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
import { getKsList, getZblb, getGhCheck } from "@/api"
import moment from "moment"

export default {
  components: { timerInfo, information },
  setup () {
    const { ctx } = getCurrentInstance()
    const data = reactive({
      timerList: [
        {
          label: '上午',
          value: 1000006
        },
        {
          label: '下午',
          value: 1000008
        },
        {
          label: '晚上',
          value: 1000009
        }
      ],
      typeList: [
        {
          label: '普通挂号',
          value: 0
        },
        {
          label: '专家门诊',
          value: 1
        },
        {
          label: '急诊挂号',
          value: 2
        }
      ],
      timeIndex: 1000006,
      indexType: 0,
      firstPage: 1,
      lastPage: 1,
      pageNum: 1,
      tableData: []
    })
    //时间切换
    const timerClick = (val) => {
      data.pageNum = 1
      data.timeIndex = val
      handelKsList()
    }
    //科室切换
    const typeClick = (val) => {
      data.pageNum = 1
      data.indexType = val
      handelKsList()
    }
    //专家选择医生
    const toDoc = (item) => {
      //普通挂号
      let origin = {
        ghks: item.ksdm,
        ghlx: data.indexType === 2 ? 1 : 0,
        jzkh: personInfo.jzkh,
        zblb: data.timeIndex
      }
      getGhCheck(origin).then(res => {
        if (res.errorCode == 'SUCCESS') {
          if (data.indexType === 0) {
            let params = {
              ghks: item.ksdm,
              ghlx: data.indexType === 2 ? 1 : 0,
              ghys: '',
              zblb: data.timeIndex,
              jzkh: personInfo.jzkh,
              ksmc: item.ksmc //接口不需要传供后续页面使用
            }
            ctx.$router.push({
              path: '/registeredPayment',
              query: {
                dataInfo: encodeURIComponent(JSON.stringify(params))
              }
            })
            //专家挂号
          } else if (data.indexType === 1) {
            let params = {
              ghlx: data.indexType === 2 ? 1 : 0, //0门诊 1急诊
              ghrq: moment().format("YYYY-MM-DD HH:mm:ss"),
              ksdm: item.ksdm,
              yslx: 1, // 1-专家 2-特需
              zblb: data.timeIndex,
              jzkh: personInfo.jzkh, //也不是必传 后续需要
            }
            ctx.$router.push({
              path: '/doctorChoice',
              query: {
                dataInfo: encodeURIComponent(JSON.stringify(params))
              }
            })
          } else {
            console.log(3)
          }
        }else{
          ctx.$message(res.message)
        }
      })
    }
    //分页
    const toNext = (val) => {
      if (val === 1) {
        if (data.pageNum > 1) {
          data.pageNum = data.pageNum - 1
          handelKsList()
        }
      } else {
        if (data.pageNum < data.lastPage) {
          data.pageNum = data.pageNum + 1
          handelKsList()
        }
      }
    }
    //获取科室
    const handelKsList = () => {
      let ghrq = moment().format("YYYY-MM-DD HH:mm:ss")
      let params = {
        cxlx: data.indexType === 2 ? 0 : data.indexType, // 0-普通 1-专家
        ghlx: data.indexType === 2 ? 1 : 0, //急诊门诊 1-急诊 0-门诊
        ghrq: ghrq, //挂号日期
        zblb: data.timeIndex, //上下晚
        pageNum: data.pageNum, //当前页码数
        pageSize: 25
      }
      getKsList(params).then(res => {
        if (res.errorCode == 'SUCCESS') {
          data.tableData.list = res.data.list
          data.firstPage = res.data.firstPage
          data.lastPage = res.data.lastPage
        }
      })
    }
    //获取值班类别
    const handelZblb = () => {
      getZblb({}).then(res => {
        let arrList = [1000006, 1000008, 1000009]
        if (arrList.includes(res.data)) {
          data.timeIndex = res.data
        } else {
          data.timeIndex = 1000006
        }
        handelKsList()
      })
    }
    let personInfo = ctx.$route.query.persion ? reactive(JSON.parse(decodeURIComponent(ctx.$route.query.persion))) : {};
    onMounted(async () => {
      await handelZblb()
    })
    return {
      personInfo,
      ...toRefs(data),
      timerClick,
      typeClick,
      toDoc,
      toNext
    }
  }
};
</script>
<style lang='scss' scoped>
@import '../../styles/common';
</style>
