<template>
  <div class="container ub-box ub-col">
   <city @cityService="cityService" @areaService="areaService"></city>
  </div>
</template>
<script>
  import city from '../../components/city.vue'
  export default {
    components: {city},
    data () {
      return {
      }
    },
    computed:{
      user(){
        return this.$store.state.userInfo
      }
    },
    methods: {
      cityService(city) {
        this.$store.commit('updateCity', city.name)
        this.$store.commit('updateCityId', city.id)
        if (city.status) {
          this.$store.commit('updateHistoryCity', city)
        }
        this.$store.commit('updateArea', '')
        this.$store.commit('updateAreaId', '')
        this.$router.go(-1)
      },
      areaService (city) {
        this.$store.commit('updateArea', city.name)
        this.$store.commit('updateAreaId', city.id)
        this.$store.commit('updateCityId', city.id)
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
  .container{width:100%;height:100%;background:#fff}
</style>
