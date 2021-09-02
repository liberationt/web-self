<template>
  <div class="main">
    <header-top></header-top>
    <div class="top">
      <div class="message">消息提醒消息提醒消息提醒消息提醒</div>
    </div>
    <div class="mainConten">
      <div class="dataInfo">
        <div
          v-for="(item, i) in dataList"
          :key="i"
          class="dataItem"
          @click="toNext(item)"
        >
          <span><img :src="item.img" alt="" /></span>
          <span class="title">{{ item.title }}</span>
        </div>
      </div>
    </div>
    <footer-bot></footer-bot>
  </div>
</template>
<script>
import headerTop from "@/layout/header"
import footerBot from "@/layout/footer"
import { onMounted, reactive, toRef } from 'vue'
import {useRouter} from 'vue-router'
export default {
  components: {
    headerTop,
    footerBot
  },
  setup () {
    const router = useRouter()
    const dataList = reactive([
      {
        img: require('../../assets/img/home_zhanghuchongzhi.png'),
        title: '账户充值',
        type:1
      },
      {
        img: require('../../assets/img/home_menzhenguahao.png'),
        title: '门诊挂号',
        route: '/cardType',
        type:2
      },
      {
        img: require('../../assets/img/home_menzhenjiaofei.png'),
        title: '门诊缴费',
        route:'/cardType',
        type:3
      },
      {
        img: require('../../assets/img/home_dengjifaka.png'),
        title: '登记发卡',
        type:4
      },
      {
        img: require('../../assets/img/home_yuyueguahao.png'),
        title: '预约挂号',
        route:'/cardType',
        type:5
      },
      {
        img: require('../../assets/img/home_yuyuequhao.png'),
        title: '预约取号',
        route:'/cardType',
        type:6
      },
      {
        img: require('../../assets/img/home_zhuyuanyujiao.png'),
        title: '住院预缴',
        type:7
      },
      {
        img: require('../../assets/img/home_xinxichaxun.png'),
        title: '信息查询',
        route: '/informationService',
        type:8
      }
    ])
    const toNext = (item) => {
      router.push(`${item.route}?type=${item.type}`)
    }
    return {
      dataList,
      toNext
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  width: 1280px;
  height: 1024px;
  margin: 0 auto;
}
.top {
  height: 48px;
  background: linear-gradient(360deg, #cad2d5 0%, #f8feff 70%, #f9ffff 100%);
  border: 1px solid #e2e6e8;
  box-sizing: border-box;
  .message {
    margin: 8px auto;
    width: 366px;
    height: 32px;
    background: linear-gradient(180deg, #eaeceb 0%, #fdfdfd 100%);
    border-radius: 18px;
    text-align: center;
    line-height: 32px;
  }
}
.mainConten {
  height: 848px;
  background: linear-gradient(132deg, #116cf6 0%, #76abfd 100%);
  background: url('../../assets/img/home_homelogo.png') no-repeat center;
  background-size: 100% 100%;
  .dataInfo {
    padding: 112px 0 0 595px;
    display: flex;
    flex-wrap: wrap;
    .dataItem {
      width: 260px;
      height: 120px;
      background: linear-gradient(360deg, #eaeceb 0%, #ffffff 100%);
      box-shadow: 0px 4px 10px 0px #1b67dd;
      border: 1px solid #e2e6e8;
      border-radius: 8px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 32px;
      cursor: pointer;
      .title {
        font-size: 24px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #1485ff;
        line-height: 36px;
        padding-left: 12px;
      }
    }
    .dataItem:nth-child(odd) {
      margin-bottom: 20px;
      margin-right: 20px;
    }
  }
}
</style>