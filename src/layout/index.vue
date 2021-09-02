<template>
    <div class="mainContent">
        <header-top></header-top>
        <div class="mianCenter">
            <router-view />
        </div>
        <footer-bot></footer-bot>
    </div>
</template>
<script>
import headerTop from "./header"
import footerBot from "./footer"
export default {
    components:{
        headerTop,
        footerBot
    },
    data(){
        return{

        }
    },
    methods:{

    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
    .mainContent{
        width:1280px;
        height:1024;
        margin:0 auto;
        .mianCenter{
            height:872px;
            background: #F3F6FA;
            padding:24px 24px 0;
            width:1232px;
        }
    }
</style>