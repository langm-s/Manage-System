<!--  -->
<template>
<div>
  <!-- <top-header></top-header> -->
  <div class="drug-search">
    
    <!--  <el-input placeholder="请输入药品名称" v-model="inputValue">
    <el-button slot="append" icon="el-icon-search" @click="handleSearch">搜索</el-button>
  </el-input> -->
    <el-autocomplete
      class="inline-input"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
    <el-button slot="append" icon="el-icon-search" @click="handleSearch"
      >搜索</el-button
    >
  </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { drugsSearch } from "../api/api";
import TopHeader from "./top-header"
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    "top-header":TopHeader
  },
  data() {
    //这里存放数据
    return {
      state: "",
      inputValue: "",
      drugData: [],
      filterResult: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSearch: function () {
      if(this.state){
      this.$store.commit("search/mysearch",{
        filterResult:this.filterResult
      })
      this.$router.push("drug_details");
      }else{
        this.$message({
          type:"error",
          message:"搜索内容不能为空，请重新输入"
        })
      }
      
    },
    querySearch(queryString, cb) {
      //过滤 关键词
      let filterResult = this.drugData.filter((v, i) => {
        v.value = v.drugName;
        // console.log(v.value);
        // return v.value.includes(queryString);
        if (v.drugName.includes(queryString)) {
          return v.value;
        }
      });

      this.filterResult = filterResult;
      // console.log(this.filterResult);
      cb(filterResult);
    },
    handleSelect: function () {},

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    let result = await drugsSearch();
    this.drugData = result.data;
    // console.log(this.data);
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
.drug-search {
  width: 40vw;
  height: 40px;
  margin: 0 auto;
  margin-top: 60px;
  .inline-input {
    width: 35vw;
  }
}
</style>