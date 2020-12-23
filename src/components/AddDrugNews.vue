<!-- 具体添加的库存药品信息 -->
<template>

  <div class="news">
      <div class="top">
          添加库存药品信息
      </div>
    <el-form
      ref="form"
      class="addnews"
      label-position="left"
      :model="form"
      label-width="90px"
    >
      <el-form-item label="药品信息:" class="drugnews">
        <el-input v-model="form.name" class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="单位:" class="drugnews">
        <el-input v-model="form.name" class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="规格:" class="drugnews">
        <el-input v-model="form.name" class="druginput"></el-input>
      </el-form-item>
    </el-form>
    <el-form
      ref="form"
      class="addnews"
      label-position="left"
      :model="form"
      label-width="90px"
    >
      <el-form-item label="生产厂商:" class="drugnews">
        <el-input v-model="form.name" class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="生产日期:" class="drugnews">
        <el-input v-model="form.name" class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="有效日期:" class="drugnews">
        <el-input v-model="form.name" class="druginput"></el-input>
      </el-form-item>
    </el-form>
    <el-form
      ref="form"
      class="addnews"
      label-position="left"
      :model="form"
      label-width="90px"
    >
      <el-form-item label="备注:" class="drugnews">
        <el-input v-model="form.name" class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="进价:" class="drugnews">
        <el-input v-model="form.name" class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="销售价格:" class="drugnews">
        <el-input v-model="form.name" class="druginput"></el-input>
      </el-form-item>
    </el-form>
    <el-form
      ref="form"
      class="addnews"
      label-position="left"
      :model="form"
      label-width="90px"
    >
      <el-form-item label="药品位置:" class="drugnews">
        <el-input v-model="form.name" class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="批号:" class="drugnews">
        <el-input v-model="form.name" class="druginput"></el-input>
      </el-form-item>
      <el-form-item label="库存：" class="drugnews">
        <el-input v-model="form.name" class="druginput"></el-input>
      </el-form-item>
    </el-form>
    <el-form
      ref="form"
      class="addnews"
      label-position="left"
      :model="form"
      label-width="90px"
    >
      <el-form-item label="条形码：" class="drugnews">
        <el-input v-model="form.name" class="druginput"></el-input>
      </el-form-item>
    
    <el-button type="primary" size="default" @click="handleDrugAdd">添加到库存</el-button>
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
      form: { name: "" },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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

    .drugnews {
      width: 30%;
      margin-right: 30px;
      .druginput {
        margin-left: 20px;
      }
    }
  }
}
</style>