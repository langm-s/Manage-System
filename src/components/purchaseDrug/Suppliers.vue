<!--  -->
<template>
  <div>
    <h1>供应商管理</h1>
    <div class="suppliers">
      <!-- 添加供应商的表单和按钮 -->
      <el-row class="add-supplier-form">
        <el-col :span="7">
          <el-input
            v-model="newSupplierName"
            placeholder="输入新的供应商的名称"
          ></el-input>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="9">
          <el-input
            v-model="newSupplierAddres"
            placeholder="输入新的供应商的地址"
          ></el-input>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="6">
          <el-button
            type="success"
            plain
            @click="handleAddSupplier"
            class="add-supplier-btn"
            >添加供应商</el-button
          >
        </el-col>
      </el-row>
      <!-- 供应商数据 -->
      <el-table :data="supplierData" border style="width: 100%;">
        <el-table-column prop="supplier" label="供应商名称" width="240">
          <template slot-scope="scope">
            <span>{{ scope.row.supplier }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <!-- <el-button type="primary" @click="handleEditSupplier(scope.$index, scope.row)">修改</el-button> -->
            <el-button
              type="danger"
              @click="handleDeleteSupplier(scope.$index, scope.row)"
              class="delete-btn"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改功能 -->
      <!-- <el-dialog title="供货商信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="供货商名称" :label-width="formLabelWidth">
          <el-input v-model="form.supplierName" autocomplete="on" placeholder="请填写供货商的名称"></el-input>
        </el-form-item>
        <el-form-item label="供货商地址" :label-width="formLabelWidth">
          <el-input v-model="form.supplierAddress" autocomplete="on" placeholder="请填写供货商的地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getSupplier } from "@/api/api";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      newSupplierName: "",
      newSupplierAddres: "",
      supplierData: [],
      dialogFormVisible: false,
      form: {
        supplierName: "",
        supplierAddress: "",
      },
      formLabelWidth: "120px",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 修改供货商的信息
    /* handleEditSupplier: function(index,row){
    this.dialogFormVisible = true;
    console.log(index);
  }, */

    // 添加供应商
    handleAddSupplier: function () {
      // 添加到最前面
      if (this.newSupplierName.trim() && this.newSupplierAddres.trim()) {
        this.supplierData.unshift({
          supplier: this.newSupplierName,
          address: this.newSupplierAddres,
        });
        this.$message({
          type: "success",
          message: "添加成功",
        });
        this.newSupplierName = "";
        this.newSupplierAddres = "";
      } else {
        this.$message({
          type: "warning",
          message: "添加失败！请输入正确信息",
        });
        this.newSupplierName = "";
        this.newSupplierAddres = "";
      }
    },
    // 删除供应商
    handleDeleteSupplier: function (index, row) {
      this.$confirm("此操作将删除该项信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.supplierData.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
      console.log(this.supplierData);
      // this.supplierData.splice(index,1);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    let result = await getSupplier();
    this.supplierData = result.data;
    /* console.log(this.tableData);
  console.log(result.data); */
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
 h1 {
    color: #fff;
    line-height: 10vh;
    background-color: rgb(59, 108, 131);
    text-align: center;
  }
.suppliers {
  width: 80%;
  margin: 20px auto;
 
  .add-supplier-form {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .add-supplier-btn {
      width: 100%;
    }
  }
}
.delete-btn {
  margin-left: 15px;
}
</style>
