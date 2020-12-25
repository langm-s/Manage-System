<!--  -->
<template>
<div class=''>
  <div class="add-drug">
    <el-form ref="add-form">
      <el-form-item>
        <el-autocomplete
          class="inline-input"
          v-model="drug_name"
          :fetch-suggestions="querySearch"
          placeholder="输入条形码或药品名称"
          :trigger-on-focus="false"
          @select="handleSelect"
          style="width:100%">
        </el-autocomplete>
        <!-- <el-input v-model="form.drugName" placeholder="输入条形码或药品名称"></el-input> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch" class="search-btn">查询</el-button>
        <el-button type="success" @click="handleCheckIn" class="check-btn">审核入库</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {getDrugMessage} from "@/api/api"
export default {
//import引入的组件需要注入到对象中才能使用
components: {}, 
data() {
//这里存放数据
return {
  // 所有药品数据
  allDrugData:[],
  // 返回的搜索数据
  searchDrugData:[],
  // 提示数据
  loadAll:[],
  // 输入的查询字段
  drug_name:"",
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  /* 点击查询药品信息，若输入为空，查询所有 */
  handleSearch: function(){
    // 把查询匹配的数据保存在store中
      this.$store.commit('purchaseDrug/mapSearch',{
        allDrugData:this.allDrugData,
        // 对查询字段两端空格
        drug_name: this.drug_name.trim(),
      });
      this.$router.push("searchAllDrug");
  },
  handleCheckIn: function(){

  },

  /* 
    输入提示
  */
  querySearch(queryString, cb) {
    var drugnames = this.loadAll;
    var results = queryString ? drugnames.filter(this.createFilter(queryString)) : drugnames;
    // 调用 callback 返回建议列表的数据
    cb(results);
  },
  createFilter(queryString) {
    return (drugnames) => {
      return (drugnames.value.indexOf(queryString) != -1);
    };
  },
  handleSelect(item) {
    console.log(item);
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
},
//生命周期 - 挂载完成（可以访问DOM元素）
async mounted() {
  let res = await getDrugMessage();
  /* 把所有药品名称保存在输入提示数组中，以对象方式存储，以value属性获取 */
  this.allDrugData = res.data;
  // 提示信息的录入
  this.allDrugData.map((item,index)=>{this.loadAll.push({
      value:item['drugName']
    })
  });
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
.add-drug{
  width: 600px;
  margin: 200px auto;
  el-form-item{
    width: 100%;
  }
  .search-btn {
    width: 48%;
  }
  .check-btn {
    width: 48%;
  }
}
</style>