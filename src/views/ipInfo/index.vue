<template>
  <div class="mainContent">
    <div class="left">
      <div class="headerTop mb17">
        <div class="title">设备信息</div>
      </div>
      <div class="tableMain">
        <div class="formInfo">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="员工姓名">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="员工代码">
                    <el-input v-model="formLabelAlign.ygdm"></el-input>
                </el-form-item>
                <el-form-item label="终端IP">
                    <el-input v-model="formLabelAlign.ip"></el-input>
                </el-form-item>
                <el-form-item label="唯一标识">
                    <el-input v-model="formLabelAlign.code"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div></div>
    <div><bot-button></bot-button></div>
  </div>
</template>
<script>
import timerInfo from "@/components/timer"
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { getSaveOrUpdate,getByIp } from "@/api"
export default {
  components: { timerInfo },
  setup () {
    const { ctx } = getCurrentInstance()
    const data = reactive({
      labelPosition:'right',
      formLabelAlign: {
        code: '',
        ip: '',
        name: '',
        ygdm:''
      },
      id:''
      
    })
    const getIpInfo=()=>{
        getByIp().then(res=>{
            data.id = res.data ? res.data.id : ''
            if(res.data){
                Object.keys(data.formLabelAlign).forEach((key)=>{
                    data.formLabelAlign[key] = res.data[key]
                })
            }

        })
    }
    const onSubmit = ()=>{
        let params = {
            ...data.formLabelAlign
        }
        if(data.id){
            params.id = data.id
        }
        getSaveOrUpdate(params).then(res=>{
            
        })
    }
    onMounted(() => {
        getIpInfo()
    })
    return {
      ...toRefs(data),
      onSubmit,
      getIpInfo
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
  .left {
    width:100%;
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
    }
  }
  .formInfo{
      width:50%;
      margin:100px auto;
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
