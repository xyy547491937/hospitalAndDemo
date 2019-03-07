<template>
    <div>
        <web-view :src="src"></web-view>
    </div>
</template>
<script>
export default {
    data(){
        return{
            src:''
        }
    },
    onShow(){
      console.log(this.$route.query);
        this.src= this.$route.query.url
    }
}
</script>
