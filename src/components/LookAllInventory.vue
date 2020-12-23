<!-- 查看所有库存 -->
<template>
  <div class="allinventory">
    <h1>查看所有的库存</h1>
    <el-table :data="tableData" border style="width: 100%" max-height="750px">
      <el-table-column label="药品名称" width="240" prop="data">
      </el-table-column>
      <el-table-column label="厂商" width="200" prop="factory">
      </el-table-column>
      <el-table-column label="进价" width="50" prop="purchasing price">
      </el-table-column>
      <el-table-column label="销售价格" width="80" prop="sale price">
      </el-table-column>
      <el-table-column label="生产日期" width="100" prop="date of manufacture">
      </el-table-column>
      <el-table-column label="有效日期" width="100" prop="effective date">
      </el-table-column>
      <el-table-column label="批号" width="100" prop="barCode">
      </el-table-column>
      <el-table-column label="备注" width="80" prop="note"> </el-table-column>
      <el-table-column label="药品位置信息" width="140" prop="location">
      </el-table-column>
      <el-table-column label="库存" width="50" prop="inventory">
      </el-table-column>
      <el-table-column label="单位" width="50" prop="unit"> </el-table-column>
      <el-table-column label="规格" width="180" prop="specification">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getInventory } from "@/api/api";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      resultData: [],
      pageSize:5,
      total: 0,
      currentPage: 1,
      pageSizes:[5, 10, 15, 25]
    };
  },
  //监听属性 类似于data概念
  computed: {
    //因为传入了tableData数据需要在计算属性里面写
    tableData: function () {
      // pageSize => 5条
      // currentPage => 1 页
      /* 
        第一页 currentPage 1 pageSize 5 => 0  5
        第二页 currentPage 2 pageSize 5 => 5  10
        .....
        第n页 currentPage n pageSize 5 => (currentPage-1)*5 currentPage*5
      
      */
     let tableData = this.resultData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      return tableData;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 处理页条数发生变化的情况
    // handleSizeChange: function (pageSize) {
    //   console.log(pageSize); //顺利传入点击的页条数
    // this.currentPage = 1; //每点击一次页数条就会刷新使页码都是保持在第一页
    //   this;
    // },
    handleSizeChange: function (pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
        this.currentPage = 1; //每点击一次页数条就会刷新使页码都是保持在第一页
    },
    handleCurrentChange: function (currentPage) {
      console.log("当前页面：", currentPage);
      this.currentPage = currentPage;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    let result = await getInventory();
    this.resultData = result.data;
    this.total = result.data.length;
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

.allinventory {
  text-align: center;
}
</style>