<template>
  <div class="search-hospital-card">
    <div class="alliance-organ" v-for="(item, i) of data" :key="i" @click="jump(item)">
      <div class="alliance-organ-info">
        <img :src="item.logo" alt="">
        <div>
          <p class="organ-info-title z-oneline-overflow-hidden">{{item.organName}}</p>
          <p class="organ-info-address">{{item.address}}</p>
          <div class="organ-info-type">
            <p class="z-oneline-overflow-hidden">
              <span>{{item.natureName}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
    }
  },
  methods: {
    jump (item) {
      this.changeJump("/pagesShop/orgin", { id: item.id });
    }
  }
}
</script>

<style scoped>
</style>
