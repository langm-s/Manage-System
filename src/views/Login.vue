<!--  -->
<template>
<div class=''>
  <div class="mylogin">
    <h1>药品销售管理系统</h1>
    <div class="login-area">
      <div class="login-form">
        <el-form :model="form" ref="loginForm" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="handleLogin('loginForm')" class="login-button">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-notice">
        <p>温馨提示</p>
        <p>未登录过的新用户，自动注册</p>
        <p>注册过的用户可根据账号密码登录</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {login} from '../api/api'
import axios from 'axios'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
  //这里存放数据
  return {
    form: {
      username:"",
      password:"",
    },
    rules:{
      username:[
        {
          required:true,
          message:"账号不能为空！",
          trigger:"blur"
        }
      ],
      password:[
        {
          required:true,
          message:"密码不能为空！",
          trigger:"blur"
        }
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
  handleLogin: function (loginForm) {
    this.$refs[loginForm].validate(async (valid) => {
      if (valid) {
       let result = await login({
            user_name: this.form.username,
            password: this.form.password,
       });
       console.log(result);
        if (result.status === 1) {
          this.$message({
          type: "success",
          message: "登陆成功",
        })
        localStorage.setItem("is_login","true");
        this.$router.push("dashboard");
        } else {
          this.$message({
            message: "登录失败",
            type: "warning",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "校验没有成功",
        });
      }
    });
  },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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
<style lang="less" scoped>
.mylogin {
  padding: 150px;
  height: 100vh;
  background-color: #f1f1f1;
  h1{
    text-align: center;
  }
  .login-area{
    width: 500px;
    height: 300px;
    background-color: #ddd;
    margin: 20px auto;
    border-radius: 6px;
    .login-form {
    padding: 30px 80px 10px 10px;
    .login-button {
      width: 100%;
    }
  }
  .login-notice {
    p {
      text-align: center;
      color: tomato;
    }
  }
  }
}
</style>