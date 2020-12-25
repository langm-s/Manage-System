<!--  -->
<template>
<div class=''>
  <el-form :model="form" :rules="rules" ref="checkFrom">
    <!-- <el-table> -->
      <el-row style="height:50px; line-height:40px; text-align:center">
        <h2>添加入库药品信息</h2>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="药品名称" label-width="100px" prop="newdrugName">
            <el-input v-model="form.newdrugName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="单位" label-width="100px" prop="newdrugUnit">
            <el-input v-model="form.newdrugUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="规格" label-width="100px" prop="newdrugSpecification">
            <el-input v-model="form.newdrugSpecification"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="厂商" label-width="100px" prop="newdrugFactory">
            <el-input v-model="form.newdrugFactory"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="生产日期" label-width="100px">
            <el-date-picker
              v-model="form.newdrugProdate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
            <!-- <el-input v-model="newdrugProdate"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="销售价格" label-width="100px" prop="newdrugSellprice">
            <el-input v-model="form.newdrugSellprice"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="备注" label-width="100px" prop="newdrugNote">
            <el-input v-model="form.newdrugNote"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="有效期至" label-width="100px" prop="newdrugLimdate">
            <el-date-picker
              v-model="form.newdrugLimdate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
            <!-- <el-input v-model="newdrugLimdate"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="进价" label-width="100px" prop="newdrugPurprice">
            <el-input v-model="form.newdrugPurprice"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="药品位置" label-width="100px" prop="newdrugLocation">
            <el-input v-model="form.newdrugLocation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="批号" label-width="100px" prop="newdrugBthnumber">
            <el-input v-model="form.newdrugBthnumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="数量" label-width="100px" prop="newdrugCount">
            <el-input v-model="form.newdrugCount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="条形码" label-width="100px" prop="newdrugBarCode">
            <el-input v-model="form.newdrugBarCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="进货时间" label-width="100px" prop="newdrugPurdate">
            <el-date-picker
              v-model="form.newdrugPurdate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
            <!-- <el-input v-model="newdrugPurdate"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="金额" label-width="100px" prop="totalPrice">
            <el-input v-model="form.totalPrice" @focus="handleComputed"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="供货商" label-width="100px" prop="newdrugSupplier">
            <el-autocomplete
              class="inline-input"
              v-model="form.newdrugSupplier"
              :fetch-suggestions="querySearch"
              placeholder="点击选择供货商"
              @select="handleSelect"
              style="width:100%">
            </el-autocomplete>
            <!-- <el-input placeholder="点击选择供货商" v-model="newdrugSupplier"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label-width="100px">
            <el-button type="primary" class="checkBtn" @click="handleCheckIn('checkFrom')">审核入库</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    <!-- </el-table> -->
  </el-form>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {getSupplier} from "@/api/api"
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  // 上一级中选中的药品  在这里显示详细信息
  chosenDrug:{},
  /* 审核入库的订单记录信息 */
  newPurchaseRecord:{},
  form:{
    newdrugName:"",
    newdrugUnit:"",
    newdrugSpecification:"",
    newdrugFactory:"",
    newdrugProdate:"",
    newdrugSellprice:"",
    newdrugNote:"",
    newdrugLimdate:"",
    newdrugPurprice:"",
    newdrugLocation:"",
    newdrugBthnumber:"",
    newdrugCount:"",
    newdrugBarCode:"",
    newdrugPurdate:"",
    totalPrice:"",
    newdrugSupplier:"",
  },
  // 供应商提示数据
  loadAll:[],
  rules:{
    newdrugName:[{required:true, message:"该项不能为空", trigger:"blur"}],
    newdrugUnit:[{required:true, message:"该项不能为空", trigger:"blur"}],
    newdrugSpecification:[{required:true, message:"该项不能为空", trigger:"blur"}],
    newdrugFactory:[{required:true, message:"该项不能为空", trigger:"blur"}],
    newdrugSellprice:[{required:true, message:"该项不能为空", trigger:"blur"}],
    newdrugNote:[{required:true, message:"该项不能为空", trigger:"blur"}],
    newdrugLimdate:[{required:true, message:"该项不能为空", trigger:"blur"}],
    newdrugPurprice:[{required:true, message:"该项不能为空", trigger:"blur"}],
    newdrugLocation:[{required:true, message:"该项不能为空", trigger:"blur"}],
    newdrugBthnumber:[{required:true, message:"该项不能为空", trigger:"blur"}],
    newdrugCount:[{required:true, message:"该项不能为空", trigger:"blur"}],
    newdrugBarCode:[{required:true, message:"该项不能为空", trigger:"blur"}],
    newdrugPurdate:[{required:true, message:"该项不能为空", trigger:"blur"}],
    totalPrice:[{required:true, message:"该项不能为空", trigger:"blur"}],
    newdrugSupplier:[{required:true, message:"该项不能为空", trigger:"blur"}],
  }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  /* 得到进货所需总价 */
  handleComputed: function(){
    this.form.totalPrice = this.form.newdrugCount*this.form.newdrugPurprice;
  },
  /* 审核 入库 */
  handleCheckIn:function(checkFrom){
    this.$refs[checkFrom].validate(async (valid) => {
      if (valid) {
        /* 校验成功 */
        /* 在store中存储本次订单的信息 */
        this.newPurchaseRecord = {
          drugName:this.form.newdrugName,
          factory:this.form.newdrugFactory,
          inventory:this.form.newdrugCount,
          note:this.form.newdrugNote,
          batchNumber:this.form.newdrugBthnumber,
          supplier:this.form.newdrugSupplier,
          dateOfManufacture:this.form.newdrugProdate,
          effectiveDate:this.form.newdrugLimdate
        };
        /* 在store仓库中存储新订单信息 */
        this.$store.commit('purchaseDrug/saveNewRecord',{
          newPurchaseRecord:this.newPurchaseRecord
        });
        /* 在store中更新最新的总订单 */
        this.$store.commit('purchaseDrug/updateAllRecord');
        this.$router.push('lookrecords');
        this.$message({
          type: "success",
          message: "入库成功",
        });
      } else {
        /* 校验失败 */
        this.$message({
          type: "warning",
          message: "入库失败",
        });
      }
    });
  },
  /* 
    输入提示
  */
  querySearch(queryString, cb) {
    var supplierNames = this.loadAll;
    var results = queryString ? supplierNames.filter(this.createFilter(queryString)) : supplierNames;
    // 调用 callback 返回建议列表的数据
    cb(results);
  },
  createFilter(queryString) {
    return (supplierNames) => {
      return (supplierNames.value.indexOf(queryString) != -1);
    };
  },
  handleSelect(item) {
    console.log(item);
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
async created() {
  this.chosenDrug = this.$store.state.purchaseDrug.chosenDrug;
  // console.log(this.chosenDrug);
  this.form.newdrugName = this.chosenDrug.drugName;
  this.form.newdrugUnit = this.chosenDrug.unit;
  this.form.newdrugSpecification = this.chosenDrug.specification;
  this.form.newdrugFactory = this.chosenDrug.factory;
  this.form.newdrugNote = this.chosenDrug.note;
  this.form.newdrugLocation = this.chosenDrug.location;
  this.form.newdrugBarCode = this.chosenDrug.barCode;
  // 供应商的名称提示
  let res = await getSupplier();
  /* 把所有药品名称保存在输入提示数组中，以对象方式存储，以value属性获取 */
  // 提示信息的录入
  (res.data).map((item,index)=>{this.loadAll.push({
      value:item['supplier']
    })
  });
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

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
<style  scoped>
.checkBtn{
  font-size: 18px;
  width: 100%;
}
</style>