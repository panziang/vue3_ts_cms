<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

export default defineComponent({
  name: 'App',
  components: {}
})
</script>

<style lang="less">
.app {
  width: 100%;
  height: 100%;
}
</style>
