<template>
  <ol class="steps">
    <li :class="[i===stepList.length-1?'step-end':'',i<stepNum?'step-active':'']" v-for="(item,i) in stepList" :key="i">
      <div class="step-line"></div>
      <div class="step-content">
        <span class="step-num">{{i+1}}</span>
        <div>{{item}}</div>
      </div>
    </li>
    <!-- <li class="step-active">
      <div class="step-line"></div>
      <div class="step-content">
        <span class="step-num">2</span>
        <div>读卡</div>
      </div>
    </li>
    <li class="step-active">
      <div class="step-line"></div>
      <div class="step-content">
        <span class="step-num">3</span>
        <div class="step-text">选择类型</div>
      </div>
    </li>
    <li class="step-active">
      <div class="step-line"></div>
      <div class="step-content">
        <span class="step-num">4</span>
        <div class="step-text">选择科室</div>
      </div>
    </li>
    <li class="step-active">
      <div class="step-line"></div>
      <div class="step-content">
        <span class="step-num">5</span>
        <div class="step-text">选择医生</div>
      </div>
    </li>
    <li>
      <div class="step-line"></div>
      <div class="step-content">
        <span class="step-num">6</span>
        <div class="step-text">付款</div>
      </div>
    </li>
    <li class="step-end">
        <div class="step-line"></div>
        <div class="step-content">
            <span class="step-num">10</span>
            <div class="step-text">确认挂号</div>
        </div>
    </li> -->
  </ol>
</template>
<script>
export default {
  props:{
    // 
    stepList:{
      type:Array,
      default:['挂号','读卡','选择类别','选择科室','选择医生','付款','确认挂号']
    },
    stepNum:{
      type:Number,
      default:3
    }
  }
};
</script>
<style lang='scss' scoped>
ol.steps::-webkit-scrollbar {
  /* chrome 隐藏滚动条*/
  display: none;
}
ol.steps {
  list-style: none;
  display: flex;
  overflow-x: auto;
  height: 64px;
  justify-content: space-between;
  padding:0 30px;
}
ol.steps:after,
ol.steps li:after {
  content: '';
  display: block;
  clear: both;
}
ol.steps li {
//   float: left;
  flex: 1;
  position: relative;
//   min-width: 120px;
}
ol.steps li .step-line {
  height: 2px;
  background-color: #e0e0e0;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
}
ol.steps li.step-active .step-line {
  background-color: #e0e0e0;
  box-shadow: inset 0 1px 1px #1485FF;
}
ol.steps .step-content {
  position: absolute;
  top: 0;
  left: -15px;
  text-align: center;
  color:#6A6D78;
  font-size:12px;
}
ol.steps li .step-content .step-num {
  display: inline-block;
  height: 20px;
  width: 20px;
  color: #fff;
  background-color: #b9b9b9;
  line-height: 20px;
  border-radius: 50%;
  text-align: center;
//   border: 2px solid rgba(224, 224, 224, 1);
  margin-bottom: 3px;
}
ol.steps li.step-active .step-content .step-num {
  background-color: #1485FF;
}
ol.steps li.step-end {
//   width: 120px !important;
  flex: inherit;
  width:35px;
}
ol.steps li.step-end .step-line {
  display: none;
}
</style>
