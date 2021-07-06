<!-- 库存查询结果列表 -->
<template>
  <div class="">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="药品名称" width="300"  prop="data"> </el-table-column>
      <el-table-column label="厂商" width="260" prop="factory"> </el-table-column>
      <el-table-column label="备注" width="100" prop="note"> </el-table-column>
      <el-table-column label="药品位置" width="240" prop="location"> </el-table-column>
      <el-table-column label="单位" width="100" prop="unit"> </el-table-column>
      <el-table-column label="规格" width="200" prop="specification"> </el-table-column>
      <el-table-column label="条形码" width="180" prop="barCode"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-thumb" @click.native.prevent="handleAddDrug(scope.$index, tableData)"
            >点击添加此药品</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [],
      state1: "",
      row:[],
     }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleAddDrug: function (index,rows) {
// console.log(rows[index]);
    this.row=rows[index]
    console.log(this.row);
        this.$store.commit("addDrugIn",{
            newDrugNews:this.row
        })
      this.$router.push("adddrugnews");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
     this.tableData = this.$store.state.searchDrug;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
   
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//scoped 是局部样式
</style>