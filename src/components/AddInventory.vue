<!-- 新增库存药品 -->
<!--  -->
<template>
  <div class="app">
    <div class="searchinventory">
      <el-row>
        <el-col :span="15">
          <el-autocomplete
            ref="inputRef"
            class="inline-input"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="请输入需要入库的药品"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-row>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch"
        >查询</el-button
      >
    </div>
    <!-- <div class="chart">
      <my-charts :seven-days="sevenDays" :api-data="apiData"></my-charts>
    </div> -->
  </div>
</template>



<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getAddDrug } from "@/api/api";
import { mapState } from "vuex";
import Charts from "@/components/charts/Tendency";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    "my-charts": Charts,
  },
  data() {
    //这里存放数据
    return {
      state: "",
      result: [],
      drugData:[],
      flag: false,
      newdrug: "",
      sevenDays: [], // 最近七天的数据的日期 ['2020-12-15'，'2020-12-16',......'2020-12-21']
      // sevenDaysDatas[0] 新增注册用户 7天数据 =>
      // sevenDaysDatas[1] 新增订单 7天数据  =>
      //  sevenDaysDatas[2] 新增管理员 7天数据
      apiData: [[], [], []],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    querySearch: function (queryString, cd) {
      // console.log(queryString); //相当于同步输出你输入在建议搜索框里的内容
      let filterResult = this.result.filter((v, i) => {
        // 还是全部输出所有店铺数据，还没有进行过滤
        // console.log(v);
        // console.log(v.value);//各个店铺的名字
        v.value = v.data;
        if (v.data.includes(queryString)) {
          return { value: v.data };
        }
      });
      this.drugData=filterResult
      console.log(this.drugData); //这个输出根据输入筛选后的匹配项的结果
      cd(filterResult); //需要这样一个回调，将过滤好的数据渲染出来
    },
    handleSelect: function (value) {
      console.log("选的药是：", value.data);
      this.newdrug = value.data;
      console.log(this.newdrug);
    },
    handleSearch: function () {


    //   if (this.newdrug === this.$refs["inputRef"].value) {

          this.$store.commit('mapSearch',{
              drugData:this.drugData
          })


        this.$router.push("adddruglist");
        this.$message({
          type: "success",
          message: "这个药找到了",
    //     });
    //   } else {
    //     this.$message({
    //       type: "warning",
    //       message: "没有这个药品哟",
    //     });
    //   }
    })
   }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    let result = await getAddDrug();
    console.log(result);
    let newResult = result.data.map((v, i) => {
      return v;
    });
    console.log(newResult);
    this.result = newResult;
    // console.log(result.data[0].factory);
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
//scoped 是局部样式
.app{
  width: 100%;
  height: 100%;
   display: flex;
  justify-content: center;
  align-items: center;
  .searchinventory {
 display: flex;
 flex-direction: row;
  .inline-input {
    width: 40vw;
  }
}
}
</style>