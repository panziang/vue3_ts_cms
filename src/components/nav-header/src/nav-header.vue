<template>
  <div class="nav-header">
    <el-icon
      :size="20"
      class="fold-menu"
      @click="handleFoldClick"
      v-if="!isFold"
      ><Fold />
    </el-icon>
    <el-icon :size="20" class="fold-menu" @click="handleFoldClick" v-if="isFold"
      ><Expand
    /></el-icon>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
//个人信息组件
import UserInfo from './user-info.vue'
//面包屑组件
import HyBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: { UserInfo, HyBreadcrumb },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    //面包屑的数据[{name, path}]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      // console.log(userMenus)
      // console.log(currentPath)
      // console.log(pathMapBreadcrumbs(userMenus, currentPath))
      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    return { handleFoldClick, isFold, breadcrumbs }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
