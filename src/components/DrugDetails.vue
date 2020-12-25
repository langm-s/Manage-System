<!--  -->
<template>
  <div class="drug-details">
    <h1>药品详情</h1>
    <el-table :data="filterData" border style="width: 100%" height="90vh">
      <el-table-column prop="drugName" label="药品名称" width="180">
      </el-table-column>
      <el-table-column prop="factory" label="厂商"> </el-table-column>
      <el-table-column prop="note" label="备注" width="80"> </el-table-column>
      <el-table-column prop="location" label="药品位置" width="120">
      </el-table-column>
      <el-table-column prop="unit" label="单位" width="50"> </el-table-column>
      <el-table-column prop="specification" label="规格"> </el-table-column>
      <el-table-column prop="barCode" label="条形码"> </el-table-column>
      <el-table-column prop="operation" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, filterData)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹框编辑信息 -->
    <el-dialog
      title="修改药品信息"
      :visible.sync="editdialogVisible"
      width="30%"
      center
    >
      <el-form
        ref="form"
        :model="ruleForm"
        label-width="80px"
        size="medile"
        style="width: 90%"
        class="elform"
        :rules="rules"
      >
        <el-form-item label="药品名称" prop="name">
          <el-input v-model="ruleForm.drugName"></el-input>
        </el-form-item>
        <el-form-item label="厂商" prop="factory">
          <el-input v-model="ruleForm.factory"></el-input> </el-form-item
        ><el-form-item label="备注" prop="note">
          <el-input v-model="ruleForm.note"></el-input> </el-form-item
        ><el-form-item label="药品位置" prop="location">
          <el-input v-model="ruleForm.location"></el-input> </el-form-item
        ><el-form-item label="单位" prop="unit">
          <el-input v-model="ruleForm.unit"></el-input> </el-form-item
        ><el-form-item label="规格" prop="specification">
          <el-input v-model="ruleForm.specification"></el-input> </el-form-item
        ><el-form-item label="条形码" prop="barCode">
          <el-input v-model="ruleForm.barCode"></el-input>
        </el-form-item>
        <el-form-item size="large" right>
          <el-button type="primary" @click="onSubmit('form')">确定</el-button>
          <el-button @click="editdialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      editdialogVisible: false,
      filterData: [],
      rules: {
        durgName: [
          { required: true, message: "药品名称不能为空", trigger: "blur" },
        ],
        factory: [{ required: true, message: "请输入厂商名", trigger: "blur" }],
        note: [{ required: true, message: "备注不能为空", trigger: "blur" }],
        location: [
          { required: true, message: "请输入厂位置信息", trigger: "blur" },
        ],
        unit: [{ required: true, message: "请输入单位", trigger: "blur" }],
        specification: [
          { required: true, message: "请输入规格", trigger: "blur" },
        ],
        barCode: [{ required: true, message: "请输入条形码", trigger: "blur" }],
      },
      ruleForm: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //判断弹框修改内容
    onSubmit(form){
       this.$refs[form].validate(async (valid) => {
        if (valid) {
          this.editdialogVisible=false;
          this.$message({
            message: "编辑成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "修改内容不能为空，请重新编辑",
            type: "error",
          });
        }
      });
    },
    handleEdit: function (scope) {
      // console.log("编辑");
      // 显示弹出窗口
      // scope.row => 一行的信息
      this.editdialogVisible = true;
      this.ruleForm = scope.row;
      console.log(scope.row);    },
    handleDelete: function (index, row) {
      console.log("删除");
      row.splice(index, 1);
      this.$message({
        type: "success",
        message: "删除成功！",
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.filterData = this.$store.state.search.newData;
    if (this.filterData.length === 0) {
      this.$message({
        type: "warning",
        message: "未查询到此类药品，请进货补充药品！",
      });
    } else {
      this.$message({
        type: "success",
        message: "查询成功！",
      });
    }
    console.log(this.filterData);
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
.drug-details {
  h1 {
    text-align: center;
    margin: 15px auto;
  }
}
</style>