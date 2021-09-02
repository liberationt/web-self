export default{
    data(){
        return{
            timer:null,
            number:100
        }
    },
    methods: {
        getTimer(){
            this.timer = setInterval(()=>{
                this.number--
            },1000) 
        }
    },  
    mounted(){
      this.getTimer()  
    }
   
}