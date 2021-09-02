
<template>
  <steps :stepList="stepList" :stepNum="stepNum"></steps>
  <div class="commonHeight">
    <div class="regLeft">
      <information :personInfo="personInfo"></information>
    </div>
    <div class="regRight regRights">
      <div class="display regtop">
        <div>门诊缴费</div>
        <div class="option">剩余操作时间: <span></span></div>
      </div>
      <div class="tableMain">
        <el-checkbox-group v-model="table3Selection" style="width:800px" class="ml24">
          <el-table
            stripe
            :highlight-current-row="true"
            :data="tableData3Clone"
            border
            class="scroll-bar"
            tooltip-effect="light"
            row-key="rowKey"
            default-expand-all
            @row-dblclick="lookDetails"
            :span-method="arraySpanMethod"
          >
          <el-table-column width="32" class-name="parent" >
            <template #default="{row}">
              <el-checkbox
                v-if="row.count"
                :indeterminate="row.isIndeterminate"
                :label="row.rowKey"
                @change="(value)=>{parentChange(value,row)}"
              >
                <span></span>
              </el-checkbox>
              <div class="data-head" v-if="row.count">
                <span>
                  门诊科室 :{{row.ksmc}}
                </span>
                <span>就诊流水号 : {{row[groupParam]}}</span>
              </div>
            </template>
          </el-table-column>
          <!-- 子级复选 -->
          <el-table-column
            width="32"
          >
            <template #default="scope">
              <el-checkbox  v-if="!scope.row.count"
                :label="scope.row"
                @change="(value)=>{childChange(value,scope.row)}"
              ></el-checkbox>
            </template>
          </el-table-column>

          <!-- 序号 -->
          <el-table-column
            prop="SerialNumber"
            width="45"
            align="center"
          ></el-table-column>

          <!-- 类型 -->
          <el-table-column
            :label="'类型'"
            prop="djlxText"
          ></el-table-column>
          <!-- 开单日期 -->
          <el-table-column
            :label="'开单日期'"
            min-width="140"
            prop="kdrq"
          >
          </el-table-column>
          <!-- 开单医生 -->
          <el-table-column
            :label="'开单医生'"
            prop="kdysmc"
          >
          </el-table-column>

          <!-- 金额 -->
          <el-table-column
            :label="'金额'"
            prop="hjje"
            class-name="text-blue-td"
          >
            <template #default="scope">
              <span v-if="!scope.row.count" class="colorInfo">{{scope.row.hjje}}</span>
              <!-- {{useGetFloat(scope.row.hjje, 2)}} -->
            </template>
          </el-table-column>
        </el-table>
      </el-checkbox-group>
      </div>
			<div class="tableMoney">
				<div class="nextInfo">
					<!-- <span class="mr10">1/3</span>
					<el-button type="primary">上一页</el-button>
					<el-button type="primary">下一页</el-button> -->
				</div>
        <div class="moneyInfo">
					<span>总金额: &nbsp;</span>
					<span class="redColor">¥{{money}}</span>
				</div>
			</div>
    </div>
  </div>
  <div class="dialogMain">
    <el-dialog title="缴费明细" v-model="dialogTableVisible">
      <el-table :data="gridData" class="tableMain">
        <el-table-column property="ypmc" label="名称" width="150"></el-table-column>
        <el-table-column property="yfdw" label="单位" width="200"></el-table-column>
        <el-table-column property="yfgg" label="规则"></el-table-column>
        <el-table-column property="ypdj" label="单价"></el-table-column>
        <el-table-column property="ypsl" label="数量"></el-table-column>
        <el-table-column property="hjje" label="金额"></el-table-column>
        <el-table-column property="ypyf" label="频次"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
  <div>
    <div></div>
    <div><bot-button :imgList="imgList" :handelClick="handelClick"></bot-button></div>
  </div>
</template>
<script>
import { getMzxxList , getMzxxPayment,getDetails} from "@/api"
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import information from "@/components/information"
export default {
  components:{information},
  setup () {
    const { ctx } = getCurrentInstance()
    const data = reactive({
      tableData:[],
      table3Selection:[],
      tableData3Clone:[],
      tableData3:[],
      dialogTableVisible:false,
      gridData:[],
      groupParam:'jzlsh',
      money:0,
      stepList:['缴费','读卡','选择类别','缴费','付款'],
      stepNum:3,
      imgList:[{
        url:require("../../assets/img/jf.png")
      }]
    })
    const parentChange=(value, row)=>{
      if(value){
        // 如果父级勾选，表格所有的选中行即为外层rowKey加内层所有
        // 因为外层复选框绑定rowKey，内层复选框绑定当前行
        data.table3Selection = [row[data.groupParam], ...data.tableData3Clone[row.parentIndex].children]
        getMoney(data.table3Selection)
      }else{
        data.table3Selection = []
        data.money = 0
      }
      // 清除半选样式
      data.tableData3Clone.forEach((item)=>{
        item.isIndeterminate = false
      })
    }
    // 子级选中/取消
    const childChange = (value, row)=>{
      if(value){
        if(data.table3Selection.includes(row[data.groupParam])){
          // data.table3Selection.push(row)
        }else{
          data.table3Selection = [row[data.groupParam], row]
        }
      }
      // 设置半选样式
      // 先清除半选样式
      data.tableData3Clone.forEach((item)=>{
        item.isIndeterminate = false
      })
      if(data.table3Selection.length <= 1){ // 外层有个rowKey
        data.table3Selection = []
        data.tableData3Clone[row.parentIndex].isIndeterminate = false
      }else if(data.table3Selection.length - 1 == row.siblings){
        data.tableData3Clone[row.parentIndex].isIndeterminate = false
      }else{
        data.tableData3Clone[row.parentIndex].isIndeterminate = true
      }
      getMoney(data.table3Selection)
    }
    //列表查询
    const getList = ()=>{
      getMzxxList({
        jzkh:personInfo.jzkh
      }).then(res=>{
        data.tableData3 = res.data.listDj
        data.tableData3.forEach((item, index)=>{
          // data.$set(item, 'index', index)
          item.index = index
        })
        transformData()
      })
    }
    //数组转换
    const transformData = ()=>{
      data.tableData3Clone = [...data.tableData3] // 全程只操作clone
      // 归类相同的手工就诊序号
      let arrJzxh = []
      let newDj = []
      let parentIndex = 0 // 外层索引
      // debugger
      data.tableData3Clone.forEach((i)=>{
        i.rowKey = i.cfsb
        // data.$set(i, 'rowKey', i.cfsb) // 设置key值
        if(!arrJzxh.includes(i[data.groupParam])){
          arrJzxh.push(i[data.groupParam])
          let obj = {
            rowKey: i[data.groupParam],
            mzks: i.kdks, // 门诊科室
            [data.groupParam]: i[data.groupParam],
            count: 1, // 计数
            parentIndex: parentIndex,
            children: [i],
            isIndeterminate: false, // 是否为半选样式
            ksmc:i.ksmc
          }
          newDj.push(obj)
          parentIndex++
        }else{
          let index = newDj.findIndex((j, index)=>{
            return j[data.groupParam] == i[data.groupParam]
          })
          newDj[index].count++
          newDj[index].children.push(i)
        }
        console.log(arrJzxh);
      })

      // 设置编号、父级索引、同级数量（包括自己）、和选中
      let SerialNumber = 1
      newDj.forEach((i)=>{
        i.children.forEach((j)=>{
          // data.$set(j, 'SerialNumber', SerialNumber++)
          // data.$set(j, 'parentIndex', i.parentIndex)
          // data.$set(j, 'siblings', i.count)
          // data.$set(j, 'childChecked', true)
          j.SerialNumber = SerialNumber++
          j.parentIndex = i.parentIndex
          j.siblings = i.count
          j.childChecked = true
        })
      })
      data.tableData3Clone = newDj
      // if(data.tableData3Clone.length > 1){
      //   data.$emit('updateMultiple', true)
      // }else{
      //   data.$emit('updateMultiple', false)
      // }

      // 默认选中第一组
      if(data.tableData3Clone.length){
        data.table3Selection = [data.tableData3Clone[0][data.groupParam], ...data.tableData3Clone[0].children]
        if(data.table3Selection.length){
          getMoney(data.table3Selection)
          // data.table3Selection.map(item=>{
          //   if(item.hjje){
          //     data.money += item.hjje
          //   }
          // })
        }
      }
     
    }
    //获取金额
    const getMoney=(money)=>{
      data.money = 0
      money.map(item=>{
        if(item.hjje){
          data.money += item.hjje
        }
      })
    }
    const arraySpanMethod = ({ row, column, rowIndex, columnIndex })=>{
      if(row.count && columnIndex == 0){
        return [1,7]
      }
    }
    //缴费
    const handelClick=()=>{
     if(data.table3Selection.length&&data.table3Selection.length>1){
       let selfCfZfblReqList = []
       data.table3Selection.map((item,i)=>{
         if(i!=0){
           selfCfZfblReqList.push({
             bllx: 0,
             cflx:item.cflx,
             cfsb:item.cfsb
           })
         }
       })
       let params ={
         selfCfZfblReqList:selfCfZfblReqList,
         jzlsh:data.table3Selection[0]
      }
      getMzxxPayment(params).then(res=>{
        if(res.errorCode=='SUCCESS'){
          let origin ={
            ...res.data,
            ...params,
            ksmc: data.table3Selection[1].ksmc
          }
          ctx.$router.push({
            path:'/outPayment',
            query: {
              dataInfo: encodeURIComponent(JSON.stringify(origin))
            }
          })
        }
      })
     }
    }
    //查看详情
    const lookDetails = (row)=>{
      // console.log(row)
      let params ={
        // bllx: 0,
        // brxz: 0,
        cflx: row.cflx,
        cfsb: row.cfsb
      }
      getDetails(params).then(res=>{
        if(res.errorCode =='SUCCESS'){
          data.dialogTableVisible = true
          data.gridData = res.data
        }
      })
    }
    let personInfo = ctx.$route.query.persion ? reactive(JSON.parse(decodeURIComponent(ctx.$route.query.persion))) : {};
    onMounted(()=>{
      getList()
    })
    return {
      personInfo,
      ...toRefs(data),
      parentChange,
      childChange,
      arraySpanMethod,
      lookDetails,
      handelClick
    }
  }
};
</script>
<style lang='scss' scoped>
@import '../../styles/common';
.parent .el-checkbox{
  float: left;
  ::v-deep .el-checkbox__label{
    padding-left: 4px;
  }
}
.data-head {
  display: inline-block;
  margin: 0 2px;
  span {
    margin: 0 8px;
    font-weight: bold;
    color: blue;
  }
  span:nth-of-type(1) {
    margin-left: 0;
  }
}
.colorInfo{
    color:#1485FF;
    font-size: 18px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 600;
  }
// .mainContent {
//   display: flex;
//   justify-content: space-between;
//   width: 1232px;
// }
// .regLeft {
//   width: 328px;
//   height: 792px;
//   background: #fff;
//   padding: 0 16px;
//   h3 {
//     font-size: 24px;
//     font-family: SourceHanSansCN-Medium, SourceHanSansCN;
//     font-weight: 500;
//     color: #222b31;
//     line-height: 56px;
//     height: 56px;
//     border-bottom: 1px solid #f0f0f0;
//   }
//   .leftLable {
//     padding: 0 8px;
//     div {
//       margin-top: 30px;
//       font-size: 22px;
//       font-family: SourceHanSansCN-Regular, SourceHanSansCN;
//       font-weight: 400;
//       color: #6a6d78;
//       .lableValue {
//         color: #222b31;
//         padding-left: 10px;
//       }
//       .money {
//         color: #1485ff;
//       }
//     }
//   }
// }
// .regRight {
//   width: 848px;
//   height: 792px;
//   background: #fff;
//   .regtop {
//     justify-content: space-between;
//     height: 56px;
//     font-size: 24px;
//     font-family: SourceHanSansCN-Medium, SourceHanSansCN;
//     font-weight: 500;
//     color: #222b31;
//     line-height: 56px;
//     border-bottom: 1px solid #f0f0f0;
//     margin: 0 24px;
//     // padding-bottom: 14px;
//     .option {
//       color: #6a6d78;
//       font-size: 20px;
//     }
//   }
// 	.tableMain{
// 		height:632px;
// 		padding:16px;
// 		overflow: auto;
// 		.el-table td, .el-table th.is-leaf{
// 			border-bottom:none !important;
// 		}
// 	}
// 	.tableMoney{
// 		height:74px;
// 		border-top:1px solid #F0F0F0;
// 		padding: 0 24px;
// 		font-size: 22px;
// 		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
// 		font-weight: 400;
// 		color: #6A6D78;
// 		line-height: 33px;
// 		display: flex;
// 		justify-content: space-between;
// 		.moneyInfo{
// 			display: flex;
// 			align-items: center;
// 			.redColor{
// 				color:#E80F0F;
// 				font-weight: 500;
// 				font-size: 26px;
// 			}
// 		}
// 		.nextInfo{
// 			display: flex;
// 			align-items: center;
// 		}
// 	}
// }
</style>
