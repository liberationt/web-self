<template>
  <div class="payDialog">
    <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      width="566px"
    >
      <div class="dialog">
        <div class="title">{{dialogInfo.title}}</div>
        <div class="text">{{dialogInfo.text}}</div>
        <div class="button" @click="closeDialog()">{{dialogInfo.button}}</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props:{
    dialogInfo:Object,
    index:Number,
    closeDialog:Function
  },
  data () {
    return {
        dialogVisible:true
    };
  },
  methods: {
      
  },
  mounted(){
      console.log(this.dialogInfo,66)
  }
};
</script>
<style lang='scss' scoped>
.dialog{
    height:298px;
    text-align: center;
    .title{
        font-size: 28px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #222B31;
        margin-bottom: 40px;
        padding-top: 40px;
    }
    .text{
        font-size: 24px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #6A6D78;
        margin-bottom: 50px;
    }
    .button{
        height: 46px;
        background: linear-gradient(180deg, #2DBBFF 0%, #1485FF 100%);
        border-radius: 4px;
        font-size: 22px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #FFFFFF;
        width: 120px;
        margin:0 auto;
        line-height:46px;
    }
}
</style>
