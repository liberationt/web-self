<template>
<h1>测试</h1>
</template>
<script>
import { getDemo } from "@/api"
export default {
    data() {
        return {

        };
    },
    methods: {

    },
    mounted(){
        let params = {
            outString:'9880Y'
        }
        let data = {
            outString:'100J'
        }
        getDemo(data).then(res=>{
            console.log(11)
        })
        getDemo(params).then(res=>{
            console.log(11)
        })
    }
};
</script>
<style lang='scss' scoped></style>

