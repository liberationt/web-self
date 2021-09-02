<template>
  <div class="cardContent">
    <div class="option">剩余操作时间</div>
    <div class="cardList">
      <div v-for="item in cardList" :key="item.icon" class="cardItem" @click="toDetails(item)">
        <div class="itemLabel">
          <span class="iconImg"><img :src="item.icon" alt=""></span>
          <span class="label">{{item.label}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
export default {
  setup(){
    const { ctx } = getCurrentInstance()
    const data = reactive({
      cardList:[
        {
          path:'',
          type:'1',
          url:'',
          icon:require("../../assets/img/yibaoka.png"),
          label:'账户查询'
        },
        {
          path:'',
          type:'2',
          url:'',
          icon:require("../../assets/img/jiankangka.png"),
          label:'住院日清单'
        },
        {
          path:'',
          type:'3',
          url:'',
          icon:require("../../assets/img/shenfenzheng.png"),
          label:'报告查询'
        },
        {
          path:'',
          type:'4',
          url:'/projectQuery',
          icon:require("../../assets/img/jiankangka.png"),
          label:'项目查询'
        },
        {
          path:'',
          type:'5',
          url:'',
          icon:require("../../assets/img/jiankangka.png"),
          label:'医院简介'
        },
        {
          path:'',
          type:'6',
          url:'',
          icon:require("../../assets/img/jiankangka.png"),
          label:'就医指南'
        },
        {
          path:'',
          type:'7',
          url:'',
          icon:require("../../assets/img/jiankangka.png"),
          label:'科室介绍'
        },
        {
          path:'',
          type:'8',
          url:'',
          icon:require("../../assets/img/jiankangka.png"),
          label:'医生排班'
        }],

    })
    const toDetails = (row)=>{
      if(row.type==4){
        ctx.$router.push(row.url)
      }
    }
    onMounted(()=>{

    })
    return {
      ...toRefs(data),
      toDetails
    }
    
  }
};
</script>
<style lang='scss' scoped>
.cardContent{
  background:#fff;
  height:792px;
  .option{
    height:56px;
    text-align: right;
    font-size: 20px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #6A6D78;
    line-height: 56px;
    border-bottom:1px solid #F0F0F0;
    margin:0 16px;
  }
  .cardList{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding:80px 66px;
    .cardItem{
      width:260px;
      height:160px;
      background: linear-gradient(360deg, #EAECEB 0%, #FFFFFF 100%);
      box-shadow: 0px 4px 10px 0px #C2C3C6;
      border-radius: 8px;
      border: 1px solid #E2E6E8;
      margin-bottom: 20px;
      .itemLabel{
        height:100%;
        display: flex;
        align-items: center;
        .iconImg{
          margin-left: 30px;
          margin-right: 14px;
        }
        .label{
          font-size: 24px;
          font-weight: 800;
          color: #1485FF;
        }
      }

      // margin:80px 50px;
      // .itemLabel{
      //   width:260px;
      //   height:120px;
      //   background: linear-gradient(360deg, #EAECEB 0%, #FFFFFF 100%);
      //   box-shadow: 0px 4px 10px 0px #C4C8CC;
      //   border-radius: 10px; 
      //   border: 1px solid #E2E6E8;
      //   display: flex;
      //   align-items: center;
      //   .iconImg{
      //     margin-left: 30px;
      //     margin-right: 14px;
      //   }
      //   .label{
      //     font-size: 24px;
      //     font-weight: 800;
      //     color: #1485FF;
      //   }
      // }
    }
  }
}
</style>
