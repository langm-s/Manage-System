<!--  -->
<template>
  <div class="">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="drugName" label="药品名称" width="160">
      </el-table-column>
      <el-table-column prop="factory" label="厂商" width="180">
      </el-table-column>
      <el-table-column prop="note" label="备注" width="80"> </el-table-column>
      <el-table-column prop="location" label="药品位置" width="100">
      </el-table-column>
      <el-table-column prop="unit" label="单位" width="50"> </el-table-column>
      <el-table-column prop="specification" label="规格" width="120">
      </el-table-column>
      <el-table-column prop="barCode" label="条形码" width="130">
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { drugsSearch } from "../api/api";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [],
      total:50 , // 总的注册用户数
      pageSize: 10,
      currentPage: 1,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleEdit: function () {
      console.log("编辑");
    },
    handleDelete: function () {
      console.log("删除");
    },
    handleSizeChange: function (pageSize) {
      this.pageSize = pageSize;
      console.log(pageSize);
      this.currentPage = 1;
     
    },
    handleCurrentChange() {},
  },
  
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    let result = await drugsSearch();
    this.tableData = result["data"];
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