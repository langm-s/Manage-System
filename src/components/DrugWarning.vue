<!--  -->
<template>
  <div class="">
    <h1 class="head">库存数量预警</h1>
    <el-table :data="tableData" height="915" border style="width: 100%;">
      <el-table-column prop="drugName" label="药品名称" width="200">
      </el-table-column>
      <el-table-column prop="factory" label="厂商" width="200">
      </el-table-column>
      <el-table-column prop="sellPrice" label="销售价格" width="150">
      </el-table-column>
      <el-table-column prop="effectiveDate" label="有效期至" width="150">
      </el-table-column>
      <el-table-column prop="batchNumber" label="批号" width="180">
      </el-table-column>
      <el-table-column prop="note" label="备注" width="150"> </el-table-column>
      <el-table-column prop="unit" label="单位" width="100"> </el-table-column>
      <el-table-column prop="specification" label="规格" width="180">
      </el-table-column>
      <el-table-column
        prop="number"
        label="筛选数量"
        :filters="[
          { text: '1', value: '1' },
          { text: '2', value: '2' },
          { text: '3', value: '3' },
          { text: '4', value: '4' },
          { text: '5', value: '5' },
          { text: '6', value: '6' },
          { text: '7', value: '7' },
          { text: '8', value: '8' },
          { text: '9', value: '9' },
          { text: '10', value: '10' },
          { text: '20', value: '20' },
        ]"
        :filter-method="filterHandler"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { drugWarning } from "@/api/api";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [],
    };
  },

  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] <= Number(value);
    },
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  async mounted() {
    //生命周期函数，挂载完成
    let result = await drugWarning();
    console.log(result);
    this.tableData = result.data;
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
<style scoped>
.head {
  color: #fff;
  line-height: 10vh;
  background-color: rgb(59, 108, 131);
  text-align: center;
}
</style>
