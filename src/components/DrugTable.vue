<!-- 库存查询结果 -->
<template>
<div class="app">
  <div class="drugList">
    <div class="topnews">药品库存查询结果</div>
    <el-table :data="tableData" border style="width: 100%" max-height="700px">
      <el-table-column label="药品名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.data }}</span>
        </template>
      </el-table-column>
      <el-table-column label="厂商" width="230">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.factory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="进价" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.purchasing_Price
          }}</span>
        </template> </el-table-column
      ><el-table-column label="销售价格" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sale_Price }}</span>
        </template> </el-table-column
      ><el-table-column label="生产日期" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.date_of_manufacture
          }}</span>
        </template> </el-table-column
      ><el-table-column label="有效日期" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.effective_date }}</span>
        </template> </el-table-column
      ><el-table-column label="批号" width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.barCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="药品位置" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="60">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.inventory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格" width="170">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.specification }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
          <el-button size="mini" type="danger" @click.native.prevent="deleteRow(scope.$index, tableData)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改库存药品信息"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        :model="form"
        ref="form"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="药品名称" prop="data">
          <el-input v-model="form.data" disabled></el-input>
        </el-form-item>
        <el-form-item label="生产厂商">
          <el-input v-model="form.factory" disabled></el-input>
        </el-form-item>
        <el-form-item label="进价">
          <el-input-number
            v-model="form.purchasing_Price"
            :step="0.05"
            controls-position="right"
            :min="1"
            :max="100000"
            >￥</el-input-number
          >
        </el-form-item>
        <el-form-item label="销售价格">
          <el-input-number
            v-model="form.sale_Price"
            :step="0.05"
            controls-position="right"
            :min="1"
            :max="100000"
            >￥</el-input-number
          >
        </el-form-item>
        <el-form-item label="生产日期">
          <el-date-picker
            v-model="form.date_of_manufacture"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="有效期至">
          <el-date-picker
            v-model="form.effective_date"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="原批号">
          <el-input :value="barCode1" disabled></el-input>
        </el-form-item>
        <el-form-item label="批号">
          <el-input v-model="form.barCode"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input-number
            v-model="form.inventory"
            :step="1"
            controls-position="right"
            :min="0"
            :max="100000"
            >￥</el-input-number
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleNoChange('form')">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div></div>
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

      form: {}, // 弹出表格信息
      barCode1: "",
      dialogVisible: false, // 弹出窗口显示或者隐藏
      pickerOptions: {
        //日期快捷键功能
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
  deleteRow(index,rows){//删除
    rows.splice(index,1);
    },
    handleNoChange: function (form) {
      // this.$nextTick(()=>{
      this.$refs.form.resetFields();

      // })
      // this.dialogVisible = false;
    },
    handleEdit: function (scope) {
      // 显示弹出窗口
      // scope.row => 一行的信息
      this.dialogVisible = true;
      // 把数据赋值给表格
      this.form = scope.row;
      this.barCode1 = this.form.barCode;
      console.log(scope);
    },
    handleDelete: function (scope) {},
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.tableData = this.$store.state.searchData;
    console.log(this.tableData);
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
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
.drugList{
width: 100%;
  border: 1px solid #36a3f0;
border-radius: 5px;
 
  .topnews{
    background-color: #36a3f0;
    padding-left: 20px;
    line-height: 40px;
     height:  40px;
     width: 100%;
  }
}}
</style>