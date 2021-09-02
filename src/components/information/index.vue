<template>
  <div class="commonTitle">患者信息</div>
  <div class="leftLable">
    <div>卡号:<span class="lableValue">{{personInfo.jzkh}}</span></div>
    <div>
      类型:<span class="lableValue">{{ personInfo.brxzMc }}</span>
    </div>
    <div>
      姓名:<span class="lableValue">{{ personInfo.brxm }}</span>
    </div>
    <div>
      年龄:<span class="lableValue">{{ personInfo.ages }}</span>
    </div>
    <div>余额:<span class="lableValue money">15</span></div>
  </div>
</template>
<script>
export default {
  props:{
    personInfo:Object
  }
};
</script>
<style lang='scss' scoped>
.leftLable {
  div {
    margin-top: 30px;
    font-size: 22px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #6a6d78;

    .lableValue {
      color: #222b31;
      padding-left: 10px;
    }

    .money {
      color: #1485ff;
    }
  }
}
</style>
