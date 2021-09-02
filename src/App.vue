<template>
  <div>
    <router-view />
    <Spinner></Spinner>
  </div>
</template>
<script>
import Spinner from "@/components/spinner"
export default {
  components: {
    Spinner
  },
  methods:{
   
  }
}
</script>
<style lang="scss">
@import './styles/index'
</style>
