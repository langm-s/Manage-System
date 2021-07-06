<!--  -->
<template>
  <div class="purchase-record">
    <h1>进货记录</h1>
    <el-table :data="filterData" border style="width: 100%"  height="85vh">
      <el-table-column prop="drugName" label="药品名称" width="240">
      </el-table-column>
      <el-table-column prop="factory" label="厂商" width="280">
      </el-table-column>
      <el-table-column prop="note" label="备注" width="150"> </el-table-column>
      <el-table-column prop="inventory" label="数量"> </el-table-column>
      <el-table-column prop="effectiveDate" label="有效期" width="180">
      </el-table-column>
      <el-table-column prop="batchNumber" label="批号"> </el-table-column>
      <el-table-column prop="dateOfManufacture" label="进货时间">
      </el-table-column>
      <el-table-column prop="supplier" label="供货商" width="240">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItem"
    >
    </el-pagination>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getRecordMessage } from "@/api/api";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      recordData: [],
      // 分页数据
      pageSizes: [5, 10, 15],
      pageSize: 10,
      currentPage: 1,
      totalItem: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {
    // 计算分页时需要渲染的数据
    filterData: function () {
      let filterData = [];
      filterData = this.recordData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      return filterData;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /* 分页操作 */
    handleSizeChange: function (pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    // 从store中获取最新更新的订单记录
    console.log(this.$store.state.purchaseDrug.allRecord);
    this.recordData = this.$store.state.purchaseDrug.allRecord;
    // 计算分页数据长度
    this.totalItem = this.recordData.length;
    // console.log(this.recordData);
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
<style lang="less" scoped>
.purchase-record {
  height: 100vh;
  overflow-y: scroll;
  h1 {
    color: #fff;
    line-height: 10vh;
    background-color: rgb(59, 108, 131);
    text-align: center;
  }
}
</style>
