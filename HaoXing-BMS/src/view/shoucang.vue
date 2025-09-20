<template>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>浏览量</span>
        </div>
      </template>
      <span>今日浏览量</span>
      <div id="main" style="width: 800px; height: 400px">
          </div>
    </el-card>
  </template>
  
  <script>
  import * as echarts from "echarts";
  export default {
    data() {
      return {
          chartInfo:[],
          tuzhu:{},
          newslist:[],
          date:{},
  
      };
    },
    mounted(){
      this.getdetail();
      this.getCharts();
      this.getdate()
    },
    methods: {
      getdetail() {
        this.$http
          .get("http://localhost:3000/newslist")
          .then((res) => {
            console.log(res);
           if (res.statusText == "OK") {
              res.data.forEach((element) => {
                this.newslist.push(element.title);
              });
           }
            this.getCharts()
          })
          .catch((err) => {});
      },
      //获取时间 x轴
      getdate() {
        this.$http
          .get("http://localhost:3000/record/list")
          .then((res) => {
            console.log(res);
           if (res.statusText == "OK") {
              res.data.forEach((element) => {
                this.newslist.push(element.title);
              });
           }
            this.getCharts()
          })
          .catch((err) => {});
      },
      getCharts() {
        var chartDom = document.getElementById("main");
        var myChart = echarts.init(chartDom);
        var option;   
        console.log(this.newslist);
  
  option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      //图注
      data: this.newslist.title
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2023-5-10', '2023-5-11', '2023-5-12', '2023-5-13', '2023-5-14', '2023-5-15', ]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: this.newslist[0],
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: this.newslist[1],
        type: 'line',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: this.newslist[2],
        type: 'line',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: this.newslist[3],
        type: 'line',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: this.newslist[4],
        type: 'line',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };
  
  option && myChart.setOption(option);
  
      },
    },
  };
  </script>
  
  <style>
  </style>