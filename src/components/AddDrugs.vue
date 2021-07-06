<!--  -->
<template>
  <div class="adddrug">
    <h1>新增药品信息</h1>
    <el-form
      ref="form"
      :model="ruleForm"
      label-width="80px"
      size="medile"
      style="width: 60%"
      class="elform"
      :rules="rules"
    >
      <el-form-item label="药品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
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
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit('form')">确认添加</el-button>
        <el-button @click="onClear">清除所有内容</el-button>
      </el-form-item>
    </el-form>
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
      // 存储新添加的药品信息
      newDrug: [],
      //接口传回来的药品信息
      lastDrugs: [],
      ruleForm: {
        name: "",
        region: "",
        factory: "",
        note: "",
        location: "",
        unit: "",
        specification: "",
        barCode: "",
      },
      rules: {
        name: [
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
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onSubmit(form) {
      //console.log("submit!");
      //检查是否全部校验
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          //校验成功  在store中存储本次订单
          this.newDrug = {
            drugName: this.ruleForm.name,
            factory: this.ruleForm.factory,
            note: this.ruleForm.note,
            location: this.ruleForm.location,
            unit: this.ruleForm.unit,
            specification: this.ruleForm.specification,
            barCode: this.ruleForm.barCode,
          };
          this.$store.commit("addDrug/saveNewDrug", {
            newDrug: this.newDrug,
          });
          this.$router.push("lookdrug");
          //跳转到所有药品信息
          this.$message({
            message: "添加药品成功",
            type: "success",
          });
          // console.log(this.newDrug);
        } else {
          this.$message({
            message: "添加失败，请再次校验",
            type: "warning",
          });
        }
      });
    },
    onClear() {
      // console.log("清除所有内容");
      this.ruleForm.name = "";
      this.ruleForm.factory = "";
      this.ruleForm.note = "";
      this.ruleForm.location = "";
      this.ruleForm.unit = "";
      this.ruleForm.specification = "";
      this.ruleForm.barCode = "";
      this.$message({
        message: "已清空所有内容",
        type: "warning",
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    let result = await drugsSearch();
    this.lastDrugs = result["data"];
    
    // console.log(this.lastDrugs);
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
.adddrug {
  h1 {
    color: #fff;
    line-height: 10vh;
    background-color: rgb(59, 108, 131);
    text-align: center;
  }
  .elform {
    margin: 50px auto;
  }
}
</style>