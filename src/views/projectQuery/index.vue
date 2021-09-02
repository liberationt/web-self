
<template>
  <div class="mainContent">
    <div class="regRight">
      <div class="display regtop">
        <div>项目查询</div>
        <div class="option">剩余操作时间: <span></span></div>
      </div>
      <div class="tableMain">
        <div class="search">
          <span @click="changeTab(1)" class="defaultColor" :class="type==1?'activeColor':'defaultColor'">药品</span>
          <span @click="changeTab(2)" class="defaultColor" :class="type==2?'activeColor':'defaultColor'">项目</span>
          <span class="searchColor">搜索</span>
          <el-input v-model="keyword" placeholder="输入项目拼音首字母查询" style="width:300px"></el-input>
        </div>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="ypmc" label="药品名称" min-width="120" v-if="type==1" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="ypmc" label="项目名称" min-width="120" v-if="type==2" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="ypgg" label="规格"> </el-table-column>
          <el-table-column prop="cdmc" min-width="120" label="厂家"> </el-table-column>
          <el-table-column prop="ypdj" label="单价"> </el-table-column>
          <el-table-column prop="zfbl" label="自负比列"> 
            <template #default="{row}">
              <span>{{row.zfbl===0? 0 :row.zfbl+'%'}}</span>
            </template>
          </el-table-column>
        </el-table>
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
  <div>
    <div>
    </div>
    <div><bot-button></bot-button></div>
  </div>
</template>
<script>
import { reactive, toRefs ,onMounted, watch} from 'vue';
import { getInfoList } from '@/api'
export default {
  setup () {
    
    const data = reactive({
      tableData:[],
      pageNum:1,
      keyword:'',
      type:1,
      pageNum:1,
      lastPage:1,
      firstPage:1,
      timer:null
    })
    const getDataList = ()=>{
      let params = {
        cxlx:data.type,
        keyword:data.keyword,
        pageNum:data.pageNum,
        pageSize:12
      }
      getInfoList(params).then(res=>{
        if(res.errorCode =='SUCCESS'){
          data.tableData = res.data.list
          data.lastPage = res.data.pages
        }
      })
    }
    const changeTab = (num)=>{
      data.type = num
      data.pageNum = 1
      getDataList()
    }
    const toNext = (val)=>{
      if(val===1){
        if(data.pageNum>1){
          data.pageNum = data.pageNum-1
          getDataList()
        }
      }else{
        if(data.pageNum<data.lastPage){
          data.pageNum = data.pageNum+1
          getDataList()
        }
      }
    }
    const debounce = (func, wait) =>{
      if (data.timer) clearTimeout(data.timer)
      data.timer = setTimeout(() => {
        func()
      }, wait)
    }
    onMounted(() => {
      getDataList()
    })
    watch(
      () => data.keyword,(val, oldval) => {
        data.keyword = val
        data.pageNum = 1
        debounce(getDataList, 1000)
      },
      {
        immediate: true,
        deep: true
      }
    )
    return {
      ...toRefs(data),
      getDataList,
      changeTab,
      toNext
    }
  }
};
</script>
<style lang='scss' scoped>
// .mainContent {
//   display: flex;
//   justify-content: space-between;
//   width: 1232px;
// }
.regRight {
  height: 792px;
width: 100%;
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
	.tableMain{
		height:652px;
		padding:0 16px;
		overflow: auto;
		.el-table td, .el-table th.is-leaf{
			border-bottom:none !important;
		}
    .search{
        display: flex;
        align-items: center;
        height:70px;
        .searchColor{
          font-size: 20px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #222B31;
          margin-right: 10px;
        }
        .defaultColor{
          color:#222B31;
          font-size: 22px;
          margin-right: 20px;;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
        }
        .activeColor{
          color:#1485FF;
          border-bottom: 2px solid #1485FF;
        }
    }
	}
	.tableMoney{
		height:74px;
		border-top:1px solid #F0F0F0;
		padding: 0 24px;
		font-size: 22px;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		font-weight: 400;
		color: #6A6D78;
		line-height: 33px;
		display: flex;
		justify-content: space-between;
		.moneyInfo{
			display: flex;
			align-items: center;
			.redColor{
				color:#E80F0F;
				font-weight: 500;
				font-size: 26px;
			}
		}
		.nextInfo{
			display: flex;
			align-items: center;
		}
	}
}
</style>
