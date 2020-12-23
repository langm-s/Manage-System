<!-- 公共菜单导航组件 -->
<template>
  <div class="commonNav">
    <el-row>
      <el-row class="myadmin-dashboard-row">
        <el-col :span="4" class="myadmin-dashboard-col">
          <el-menu
            :default-active="defaultActive"
            text-color="#ffffff"
            active-text-color="#2986e8"
            background-color="#1f2d3d"
            class="dashboard-left"
            router
          >
            <div class="logo">
              <img src="../assets/logo.png" alt="" />
              <h1>药店销售管理系统</h1>
            </div>
            <!-- <el-menu-item index="dashboard">
            <i class="el-icon-menu"></i>
            <span slot="title"></span>
          </el-menu-item> -->
            <!-- 药品信息开始 -->
            <el-submenu index="drugbasicdata">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>药品基础信息</span>
              </template>
              <el-menu-item index="dashboard"><i class="el-icon-search"></i>搜索药品信息</el-menu-item>
              <el-menu-item index="lookdrug"><i class="el-icon-view"></i>查看药品信息</el-menu-item>
              <el-menu-item index="adddrug"><i class="el-icon-document-add"></i>添加药品信息</el-menu-item>
            </el-submenu>
            <el-submenu index="purchasedata">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>进货信息</span>
              </template>
              <el-menu-item index="checkdrug"><i class="el-icon-search"></i>药品审核入库</el-menu-item>
              <el-menu-item index="lookrecords"><i class="el-icon-view"></i>查看供货记录</el-menu-item>
              <el-menu-item index="suppliermannage"><i class="el-icon-user-solid"></i>供货商管理</el-menu-item>
            </el-submenu>
            <el-submenu index="druginventory">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>药品库存信息</span>
              </template>
              <el-menu-item index="searchinventory"><i class="el-icon-search"></i>库存药品查询</el-menu-item>
              <el-menu-item index="lookallinventory"><i class="el-icon-view"></i>查看所有库存</el-menu-item>
              <el-menu-item index="addinventory"><i class="el-icon-circle-plus-outline"></i>新增库存药品</el-menu-item>
            </el-submenu>
            <el-menu-item index="warninventory"><i class="el-icon-warning"></i>库存预警</el-menu-item>
            <el-menu-item index="salerecordss"><i class="el-icon-s-order"></i>销售记录</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20" class="myadmin-dashboard-col">
          <router-view></router-view>
        </el-col>
      </el-row>
    </el-row>
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
      defaultActive: "searchdrug",
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
  mounted() {
    this.defaultActive=location.hash.split("/")[1];
    if (location.hash.slice(2)=="adddruglist"||location.hash.slice(2)=="adddrugnews") {
       this.defaultActive="addinventory"
    } 
     if (location.hash.slice(2)=="drugtable") {
       this.defaultActive="searchinventory"
    }
    
    
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

.commonNav {
  height: 100vh;
}
.myadmin-dashboard-row {
  height: 100vh;
  .myadmin-dashboard-col {
    height: 100vh;
  }
  .dashboard-left {
    height: 100vh;
    .logo {
      height: 200px;
      margin: 30px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      h1 {
        text-align: center;
      }
      img {
        width: 10vh;
        height: 10vh;
      }
    }
  }
}
</style>