<template>
    <div class="footer">
        <div>终端号: CS001</div>
        <div class="center"><span class="line"></span><span class="bbNumber">版本号: 5.31</span><span class="line"></span></div>
        <div>蓝生信息科技有限公司</div>
    </div>
</template>
<script>
export default {
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
    .footer{
        height:48px;
        background: linear-gradient(315deg, #116CF6 0%, #76ABFD 100%);
        border-radius: 0px 20px 0px 0px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size:16px;
        color:#fff;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        .center{
            margin:0 20px;
            display: flex;
            align-items: center;
            .bbNumber{
                padding:0 20px;
            }
            .line{
                width:1px;
                height:10px;
                opacity: 0.5;
                background:#FFF;
            }
        }
    }
</style>