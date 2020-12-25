<!--  -->
<template>
<div class='addSearch-list'>
  <h2>选择要添加的药品</h2>
  <el-table
    :data="filterData"
    border
    style="width: 100%">
    <el-table-column
      prop="drugName"
      label="药品名称"
      width="240">
      <template slot-scope="scope">
        <span>{{scope.row.drugName}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="factory"
      label="厂商"
      width="280">
      <template slot-scope="scope">
        <span>{{scope.row.factory}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="note"
      label="备注"
      width="150">
      <template slot-scope="scope">
        <span>{{scope.row.note}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="location"
      label="药品位置信息">
      <template slot-scope="scope">
        <span>{{scope.row.location}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="unit"
      label="单位"
      width="100">
      <template slot-scope="scope">
        <span>{{scope.row.unit}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="specification"
      label="规格">
      <template slot-scope="scope">
        <span>{{scope.row.specification}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="barCode"
      label="条形码">
      <template slot-scope="scope">
        <span>{{scope.row.barCode}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="140">
      <template slot-scope="scope">
        <el-button type="primary" @click="purchaseThisDrug(scope.$index, scope.row)">添加此药品</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItem">
    </el-pagination>
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
  // 上级查询的结果
  tableData: [],
  // 选中的药品数据
  chosenDrugL:{},
  pageSizes:[5,10,15],
  pageSize:10,
  currentPage:1,
  totalItem:0,
};
},
//监听属性 类似于data概念
computed: {
  // 计算分页时需要渲染的数据
  filterData: function(){
    let filterData = [];
    filterData = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
    return filterData;
  },
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  purchaseThisDrug: function(index,row){
    // console.log(index);
    // 把选中的数据保存在store中，用于渲染下级详细数据
    this.$store.commit('purchaseDrug/choseDrug',{
      chosenDrug:this.tableData[index],
    })
    this.$router.push('add_drug_msg');
  },
  /* 分页操作 */
  handleSizeChange: function(pageSize){
    this.pageSize = pageSize;
    this.currentPage = 1;
  },
  handleCurrentChange:function(currentPage){
    this.currentPage = currentPage;
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
},
//生命周期 - 挂载完成（可以访问DOM元素）
async mounted() {
  // let result = await getDrugMessage();
  // this.tableData = result.data;
  this.tableData = this.$store.state.purchaseDrug.searchDrugData;
  this.totalItem = this.tableData.length;
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
.addSearch-list {
  height: 100vh;
  overflow-y: scroll;
  h2 {
    text-align: center;
    line-height: 80px;
  }
}
</style>