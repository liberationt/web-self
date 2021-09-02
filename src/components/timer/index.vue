<template>
    <div>
        <span class="sytimer">剩余操作时间 :</span>
        <span class="timer">{{count}}<span class="font20">S</span></span>
    </div>
</template>
<script>
// import { reactive,onMounted, toRefs } from '@vue/reactivity';
import { getCurrentInstance, onMounted, reactive, ref, toRefs,onBeforeUnmount } from 'vue';
export default {
    setup(){
        const data = reactive({
            count:100,
            timer:''
        })
        const timer = ()=>{
            data.timer = setInterval(()=>{
                data.count--
                if(data.count==0){
                    clearInterval(data.timer)
                    data.timer = '' 
                }
            },1000)
        }
        onMounted(() => {
            timer()
        })
        onBeforeUnmount(() => {
            clearInterval(data.timer)
            data.timer = ''
            data.count = 100

        })
        return {
            ...toRefs(data),
            timer
        }
    }
};
</script>
<style lang='scss' scoped>
.timer{
    color:#E80F0F;
    display: inline-block;
    font-size: 26px;
    width:60px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
}
.sytimer{
    color:#6A6D78;
    font-size: 20px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
}
</style>
