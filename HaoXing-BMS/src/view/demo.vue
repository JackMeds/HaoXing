<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const barChart = ref(null)

onMounted(() => {
  const myChart = echarts.init(barChart.value)

  const chartData = {
    categories: ['男生', '女生', '玄幻', '悬疑推理', '付费', '穿越', '科幻'],
    data: [3, 5, 8, 9, 10, 15, 8]
  }

  const option = {
    title: {
      text: '书籍分类数量'
    },
    tooltip: {},
    xAxis: {
      data: chartData.categories
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: chartData.data
    }]
  }

  // 设置图表配置项
  myChart.setOption(option)
})

</script>

<template>
  <div ref="barChart" style="width: 600px; height: 400px;"></div>
</template>
