<template>
  <!-- <div class="top">
    <div></div>
    <div>
      <timer-info></timer-info>
    </div>
  </div> -->
  <div class="mainContent">
    <div class="left">
      <div class="headerTop mb17">
        <div class="title">本机发票号段范围</div>
        <div class="options" @click="add(1)">
          <span><img src="@/assets/img/add.png" alt="" /></span>
          <span>新增</span>
        </div>
        <!-- <div class="options">
          <span><img src="@/assets/img/save.png" alt="" /></span>
          <span>保存</span>
        </div> -->
      </div>
      <div class="tableMain">
        <el-table
          :data="tableData"
          stripe
          style="width: 92%; margin-left: 24px"
					@row-dblclick="save"
        >
          <el-table-column label="序号" type="index" width="80">
          </el-table-column>
          <el-table-column
            prop="ysmc"
            min-width="100"
            align="center"
            label="起止票号"
          >
            <template #default="{ row }">
              <div class="qh">
                <span>{{ row.qshm }}</span>
                <span>-</span>
                <span>{{ row.zzhm }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="sypb" align="center" label="状态">
            <template #default="{ row }">
              <span>{{ row.sypb == 1 ? '未使用' : '使用' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template #default="{ row }">
							<div class="qh">
								<span>
									<el-tooltip content="更新" effect="light">
										<el-popconfirm
											confirmButtonText='确定'
											cancelButtonText='取消'
											title="确认更新？"
											@confirm="update(row)"
										>
											<template #reference>
												<i class="el-icon-refresh"></i>
											</template>
										</el-popconfirm>
									</el-tooltip>
								</span>
								<span>
									<el-tooltip content="截取" effect="light">
										<el-popconfirm
											confirmButtonText='确定'
											cancelButtonText='取消'
											title="确认截取？"
											@confirm="splice(row)"
										>
											<template #reference>
												<i class="el-icon-scissors"></i>
											</template>
										</el-popconfirm>
									</el-tooltip>
								</span>
								<span>
									<el-tooltip content="删除" effect="light">
										<el-popconfirm
											confirmButtonText='确定'
											cancelButtonText='取消'
											title="确认删除？"
											@confirm="remove(row)"
										>
											<template #reference>
												<i class="el-icon-delete"></i>
											</template>
										</el-popconfirm>
									</el-tooltip>
								</span>
							</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="right">
      <div class="headerTop mb17">
        <div class="title">本机健康卡号段范围</div>
        <div class="options" @click="add(2)">
          <span><img src="@/assets/img/add.png" alt="" /></span>
          <span>新增</span>
        </div>
        <!-- <div class="options">
          <span><img src="@/assets/img/save.png" alt="" /></span>
          <span>保存</span>
        </div> -->
      </div>
      <div class="tableMain">
        <el-table
          :data="tableData"
          stripe
          style="width: 92%; margin-left: 24px"
        >
          <el-table-column
            prop="ksdmText"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column
            prop="ysmc"
            align="center"
            label="起止票号"
          ></el-table-column>
          <el-table-column
            prop="jhhm"
            align="center"
            label="状态"
          ></el-table-column>
          <el-table-column align="center" label="操作">
            <template #default="{ row }">
              <div class="qh">
                <span style="color: #f95776" @click="toQh(row)">取号</span>
                <span class="ml30" @click="cancle(row)">取消</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
	<div>
    <div></div>
    <div><bot-button></bot-button></div>
  </div>
  <div class="payDialog">
    <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      width="566px"
    >
      <div class="dialog">
        <div class="title">发票号段范围</div>
        <el-form label-width="80px" :model="formLabelAlign">
          <el-form-item label="起始号码">
            <el-input v-model="formLabelAlign.qshm"></el-input>
          </el-form-item>
          <el-form-item label="结束号码">
            <el-input v-model="formLabelAlign.zzhm"></el-input>
          </el-form-item>
          <el-form-item label="使用号码">
            <el-input v-model="formLabelAlign.syhm"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="config">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import timerInfo from "@/components/timer"
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { getYgpjAdd, getYgpjList, getUpdateSypb, getInterceptYgpj,getRemove,getEdit } from "@/api"
export default {
  components: { timerInfo },
  setup () {
		const { ctx } = getCurrentInstance()
    const data = reactive({
      tableData: [],
      dialogVisible: false,
      formLabelAlign: {
        qshm: '',
        syhm: '',
        zzhm: ''
      },
			type:0,
			jlxh:''
    })
    const add = (num) => {
      data.dialogVisible = true
    }
		//确定
    const config = () => {
      let params = {
        ...data.formLabelAlign,
        pjlx: 2
      }
			if(data.type == 1){
				params.jlxh = data.jlxh
				getEdit(params).then(res=>{
					if (res.errorCode == 'SUCCESS') {
						data.dialogVisible = false
						getList()
					}
				})
			}else{
				getYgpjAdd(params).then(res => {
					if (res.errorCode == 'SUCCESS') {
						data.dialogVisible = false
						getList()
					}
				})
			}
    }
		//列表
    const getList = () => {
      let params = {
        pjlx: 2
      }
      getYgpjList(params).then(res => {
        data.tableData = res.data.list
				data.type = 0 
				data.jlxh = ''
      })
    }
    //操作
    const update = (row) => {
      let params = {
				pjlx: 2,
				jlxh: row.jlxh,
				sypb:row.sypb===1?0:1
			}
			getUpdateSypb(params).then(res=>{
				if(res.errorCode=='SUCCESS'){
					getList()
				}
			})
    }
		const splice = (row)=>{
			if(row.jqpb==1){
				ctx.$message("票据已截取")
				return
			}
			let params = {
				jlxh:row.jlxh
			}
			getInterceptYgpj(params).then(res=>{
				if(res.errorCode=='SUCCESS'){
					getList()
				}
			})
		}
		const remove = (row)=>{
			let params = {
				jlxh:row.jlxh
			}
			getRemove(params).then(res=>{
				if(res.errorCode =='SUCCESS'){
					getList()
				}
			})
		}
		const save = (row)=>{
			data.formLabelAlign = {
				qshm:row.qshm,
				syhm:row.syhm,
				zzhm:row.zzhm
			}
			data.type = 1
			data.jlxh = row.jlxh
			data.dialogVisible = true
		}
		const cancel =()=>{
			data.dialogVisible = false
			data.type = 0
			
		}
    onMounted(() => {
      getList()
    })
    return {
      ...toRefs(data),
      add,
			update,
			splice,
			remove,
			cancel,
      config,
      getList,
			save
    }
  }
};
</script>
<style lang='scss' scoped>
.top {
  height: 58px;
  display: flex;
  justify-content: space-between;
  // align-items: center;
}
.mainContent {
  height: 792px;
  display: flex;
  justify-content: space-between;
  .left,
  .right {
    width: 604px;
    background: #fff;
    .headerTop {
      height: 54px;
      border-bottom: 1px solid #f0f0f0;
      padding: 0 24px;
      display: flex;
      align-items: center;
			justify-content: space-between;
      .title {
        font-size: 24px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #222b31;
      }
      .options {
        display: flex;
        align-items: center;
        font-size: 22px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #222b31;
        height: 54px;
        margin-left: 20px;
        img {
          width: 22px;
          height: 22px;
          margin-top: 11px;
          margin-right: 5px;
        }
      }
    }
  }
}
.payDialog {
  .dialog {
    padding: 16px 20px;
  }
  .title {
    font-size: 24px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #222b31;
    margin-bottom: 40px;
  }
}
.qh {
  display: flex;
  span {
    margin: 0 8px;
  }
}
</style>
