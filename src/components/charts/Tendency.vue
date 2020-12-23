<!-- 首页的折线图 -->
<template>
  <div class="">
    <div
      class="myadmin-home-chart"
      id="mychart"
      :style="{ width: '100%', minHeight: '300px' }"
    ></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// let echarts = require("echarts");
import * as echarts from "echarts";
export default {
   props:{
       // 横左边数据 ["2020-12-15"..."2020-12-21"]
       sevenDays:{
           type:Array,
           default:[]
       },
       /* 
        [
            [1,2,3,4,5,5,6],
            [1,2,3,4,5,5,6],
            [1,2,3,4,5,5,6],
        ]
       */
       apiData:{
           type:Array,
           default:[[],[],[]]
       }
   },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
      // 监听纵坐标数据变化
      apiData:{
          deep:true,
          handler:function(){
              this.initChart(this.sevenDays,this.apiData);
          }
      }
  },
  //方法集合
  methods: {
    // 初始echart 表格方法

    initChart: function (sevenDays, apiData) {
      let mychart = echarts.init(document.getElementById("mychart"));
      let options = {
        title: {
          text: "折线图堆叠",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["新增注册用户", "新增订单", "新增管理员"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: sevenDays,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "新增注册用户",
            type: "line",
            stack: "总量",
            // 2020-12-15 ...... 2020-12-21
            data: apiData[0],
          },
          {
            name: "新增订单",
            type: "line",
            stack: "总量",
            data: apiData[1],
          },
          {
            name: "新增管理员",
            type: "line",
            stack: "总量",
            data: apiData[2],
          },
        ],
      };
      // echarts
      mychart.setOption(options);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      console.log(this.sevenDays,this.apiData);
      this.initChart(this.sevenDays,this.apiData);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
</style>