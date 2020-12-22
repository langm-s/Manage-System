<!-- 公共菜单导航组件 -->
<template>
  <div class="commonNav">
    <el-row>
      <el-row class="myadmin-dashboard-row">
        <!-- 
        hash => default-active => 
       -->
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
            <el-submenu index="datamanager">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>药品基础信息</span>
              </template>
              <el-menu-item index="userlist">搜索药品信息</el-menu-item>
              <el-menu-item index="shoplist">查看药品信息</el-menu-item>
              <el-menu-item index="foodlist">添加药品信息</el-menu-item>
            </el-submenu>
            <el-submenu index="datamanager">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>进货信息</span>
              </template>
              <el-menu-item index="userlist">药品审核入库</el-menu-item>
              <el-menu-item index="shoplist">查看供货记录</el-menu-item>
              <el-menu-item index="foodlist">添加药品信息</el-menu-item>
            </el-submenu>
            <el-submenu index="datamanager">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>药品库存信息</span>
              </template>
              <el-menu-item index="userlist">搜索药品信息</el-menu-item>
              <el-menu-item index="shoplist">查看药品信息</el-menu-item>
              <el-menu-item index="foodlist">添加药品信息</el-menu-item>
            </el-submenu>
            <el-submenu index="datamanager">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>库存预警</span>
              </template>
              <el-menu-item index="userlist">搜索药品信息</el-menu-item>
              <el-menu-item index="shoplist">查看药品信息</el-menu-item>
              <el-menu-item index="foodlist">添加药品信息</el-menu-item>
            </el-submenu>
            <el-submenu index="datamanager">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>销售记录</span>
              </template>
              <el-menu-item index="userlist">搜索药品信息</el-menu-item>
              <el-menu-item index="shoplist">查看药品信息</el-menu-item>
              <el-menu-item index="foodlist">添加药品信息</el-menu-item>
            </el-submenu>
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
    return {};
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
.logo {
  height: 100px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 10vh;
    height: 10vh;
  }
}
</style>