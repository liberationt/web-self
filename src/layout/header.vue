<template>
  <div class="header">
    <div class="topLeft">
      <div class="mt20 ml24"><img src="@/assets/img/home_logo.png" /></div>
      <div class="logoName">上海天佑医院自助服务系统</div>
      <div class="label">
        <span><span class="line"></span>同德</span>
        <span><span class="line"></span>济众</span>
        <span><span class="line"></span>天勤</span>
        <span><span class="line"></span>佑医</span>
      </div>
    </div>
    <div class="topRight" @click="showModel">{{nowTime}}</div>
  </div>
  <teleport to="body">
    <div class="modal" v-if="isShow" @click.self="isShow=false">
      <div class="loginMain">
        <div class="title">账号登录</div>
        <div>
          <div class="username">
            <el-input placeholder="请输入内容" v-model="username">
              <template #prepend><i class="el-icon-user"></i></template>
            </el-input>
          </div>
          <div class="username">
            <el-input placeholder="请输入内容" v-model="password">
              <template #prepend><i class="el-icon-lock"></i></template>
            </el-input>
          </div>
        </div>
        <div class="login" @click="login">
          登录
        </div>
      </div>
    </div>
  </teleport> 
</template>
<script>
import { getLogin } from "@/api"
import md5 from 'js-md5';
export default {
  data () {
    return {
			nowTime:'',
      isShow:false,
      username:'',
      password:''
    }
  },
  methods: {
		timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
      let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
      let week = new Date(timeStamp).getDay();
      let weeks = ["日","一","二","三","四","五","六"];
      let getWeek = "星期" + weeks[week];
			this.nowTime = `${year}年${month}月${date}日 ${getWeek} ${hh}:${mm}:${ss}`
    },
    nowTimes(){
      this.timeFormate(new Date());
      setInterval(this.nowTimes,1000);
      this.clear()
    },
    clear(){
      clearInterval(this.nowTimes)
      this.nowTimes = null;
    },
    showModel(){
      this.isShow = true
    },
    login(){
      let params = {
        username:this.username,
        password:md5(this.password)
      }
      getLogin(params).then(res=>{
        if(res.errorCode=='SUCCESS'){
          localStorage.setItem('tokenInfo',res.data)
        }
      })
    }
  },
  created(){
		this.nowTimes()
  }
}
</script>
<style lang="scss" scoped>
.header {
  height: 80px;
  width: 1280px;
  margin: 0 auto;
  background: url('../assets/img/home_top_bg.png') center no-repeat;
  background-size: 100%;
	display: flex;
	justify-content: space-between;
  .topLeft {
    display: flex;
    .logoName {
      font-size: 32px;
      font-family: Helvetica;
      color: #fff;
      margin: 22px 10px 0 7px;
      letter-spacing: 3px;
    }
    .label {
      margin-top: 10px;
      display: flex;
      > span {
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #fff;
        font-size: 18px;
        display: flex;
        align-items: center;
        padding-right: 10px;
        .line {
          display: inline-block;
          width: 2px;
          height: 16px;
          background: #fff;
          opacity: 0.5;
          margin-right: 10px;
        }
      }
    }
  }
  .topRight {
		width:320px;
		margin-top: 31px;
		height:48px;
		background: linear-gradient(315deg, #116CF6 0%, #76ABFD 100%);
		border-radius: 60px 0px 0px 0px;
		font-size:16px;;
		color: #fff;
		text-align: center;
		line-height: 48px;
  }
}
.modal{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  .loginMain{
    width: 566px;
    height: 456px;
    background: #FFFFFF;
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    .title{
      margin-top: 40px;
      margin-bottom: 40px;
      text-align: center;
      font-size: 28px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #222B31;
    }
    .username{
      height:72px;
      width:400px;
      margin: 40px auto;
    }
    .login{
      width: 400px;
      height: 72px;
      background: #1485FF;
      border-radius: 8px;
      margin: 0 auto;
      font-size: 24px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #FFFFFF;
      text-align: center;
      line-height:72px;
    }
  }
}
</style>