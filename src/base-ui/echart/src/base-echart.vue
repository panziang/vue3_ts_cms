<template>
  <div class="base-echart">
    <div ref="echarDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

//导入props
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echarDivRef = ref<HTMLElement>()

onMounted(() => {
  // const echartInstance = echarts.init(echarDivRef.value!)
  // echartInstance.setOption(props.options)
  const { setOptions } = useEchart(echarDivRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
