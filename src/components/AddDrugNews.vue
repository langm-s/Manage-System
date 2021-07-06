<!-- 具体添加的库存药品信息 -->
<template>

  <div class="news">
      <div class="top">
          添加库存药品信息
      </div>
    <el-form
    :rules="rules"
      ref="form"
      class="addnews"
      label-position="left"
      :model="form"
      label-width="90px"
    >
      <el-form-item label="药品信息:"  class="drugnews">
        <el-input v-model="form.data" disabled class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="单位:"  class="drugnews">
        <el-input v-model="form.unit" disabled class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="规格:" class="drugnews">
        <el-input v-model="form.specification" disabled class="druginput"></el-input>
      </el-form-item>
    </el-form>
    <el-form
    :rules="rules"
      ref="form"
      class="addnews"
      label-position="left"
      :model="form"
      label-width="90px"
    >
      <el-form-item label="生产厂商:" class="drugnews">
        <el-input v-model="form.factory" disabled class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="生产日期:" prop="date_of_manufacture" class="drugnews">
        <el-date-picker
        class="druginput orderWidth"
            v-model="form.date_of_manufacture"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
      </el-form-item>
      <el-form-item label="有效日期:" prop="effective_date" class="drugnews">
        <el-date-picker
        class="druginput orderWidth"
            v-model="form.effective_date"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
      </el-form-item>
    </el-form>
    <el-form
    :rules="rules"
      ref="form"
      class="addnews"
      label-position="left"
      :model="form"
      label-width="90px"
    >
      <el-form-item label="备注:" class="drugnews">
        <el-input v-model="form.note" disabled class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="进价:" prop="purchasing_Price" class="drugnews">
          <el-input-number
          class="druginput orderWidth"
          size="large"
            v-model="form.purchasing_Price"
            :step="0.05"
            controls-position="right"
            :min="1"
            :max="100000"
            >￥</el-input-number
          >
      </el-form-item>
      <el-form-item label="销售价格:" prop="sale_Price" class="drugnews">
         <el-input-number
          class="druginput orderWidth"
          size="large"
            v-model="form.sale_Price"
            :step="0.05"
            controls-position="right"
            :min="1"
            :max="100000"
            >￥</el-input-number
          >
      </el-form-item>
    </el-form>
    <el-form
    :rules="rules"
      ref="form"
      class="addnews"
      label-position="left"
      :model="form"
      label-width="90px"
    >
      <el-form-item label="药品位置:" class="drugnews">
        <el-input v-model="form.location" disabled class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="批号:" class="drugnews">
        <el-input v-model="form.barCode" disabled class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="库存：" prop="inventory" class="drugnews">
          <el-input-number
          class="druginput orderWidth"
          size="large"
            v-model="form.inventory"
            :step="0.05"
            controls-position="right"
            :min="1"
            :max="100000"
            >￥</el-input-number
          >
      </el-form-item>
    </el-form>
    <el-form
    :rules="rules"
      ref="form"
      class="addnews"
      label-position="left"
      :model="form"
      label-width="90px"
    >
      <el-form-item label="条形码：" class="drugnews">
        <el-input v-model="form.barCode" disabled class="druginput"></el-input>
      </el-form-item>
    
    <el-button type="primary" class="drugBtn" size="default" @click="handleDrugAdd('form')">添加到库存</el-button>
    </el-form>
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
      form: {},
      rules:{
          purchasing_Price:[
               { required: true, message: '请输入合理的价格', trigger: 'blur' },
            // { min: 3, max: 5, message: '什么药呀你要这么贵，给我控制在价格控制在1000元内！！！', trigger: 'blur' }

          ],sale_Price:[
               { required: true, message: '请输入合理的价格', trigger: 'blur' },

            // { min: 3, max: 5, message: '什么药呀你要这么贵，给我控制在价格控制在1000元内！！！', trigger: 'blur' }

          ],
          date_of_manufacture:[
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          effective_date:[
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          inventory:[
              { required: true, message: '请加入适当的库存', trigger: 'blur' },
          ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      handleDrugAdd:function(formName){//添加仓库
        console.log(this.form);
        this.$refs[formName].validate((valid) => {
            console.log(valid);
            if (valid) {
                this.$message({
                    type:"success",
                    message:"添加库存成功了"
                })
                this.$store.commit("addDrugIn",{
                    newDrugForm:this.form
                })
                this.$router.push("lookallinventory")
            }else{
                this.$message({
                    type:"warning",
                    message:"添加库存失败啦"
                })
            }
        })
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
      this.form=this.$store.state.addDrugNews;
      console.log(this.form);
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
};
</script>
<style lang='less' scoped>
//scoped 是局部样式
.news {
    margin-left: 20px;
  border: 2px solid #9cdcda;
  border-radius: 5px;

  .top{
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      padding-left: 10px;
      color: #38c9c4;
      background-color: #9cdcda;
      margin-bottom: 10px;
  }
  .addnews {
      padding: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
.drugBtn{
    width: 357px;
    float: right;
    margin-bottom: 22px;
    position: absolute;
    right: 85px;
}
    .drugnews {
      width: 30%;
      margin-right: 30px;
      .orderWidth{
          width: 357px;
      }
      .druginput {
        margin-left: 20px;
      }
    }
  }
}
</style>