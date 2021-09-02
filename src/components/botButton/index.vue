<template>
 <div class="button">
     <div></div>
     <div class="imgList">
        <!-- <div class="home">{{num}}</div> -->
        <div v-for="(item,i) in imgList" :key="i" @click="handelClick()"><img :src="item.url"></div>
        <div class="ml10" @click="toHome"><img src="@/assets/img/sy.png" alt=""></div>
     </div>
 </div>
</template>
<script>
export default {
    props:{
        imgList:{
            type:Array,
            default:[]
        },
        handelClick:{
            type:Function,
            default:()=>{}
        }
    },
    data() {
        return {};
    },
    methods: {
        toHome(){
            this.$router.push('/')
        }
    }
};
</script>
<style lang='scss' scoped>
.button{
    height:80px;
    background: #F3F6FA;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .imgList{
        display: flex;
        >div{
            height:48px;
            width:144px;
            img{
                width:100%;height:100%;
            }
        }
    }
}
</style>

