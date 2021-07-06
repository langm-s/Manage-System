<!--  -->
<template>
  <div class="loginpage">
    <div class="mylogin">
      <h1>药品信息管理系统</h1>
      <div class="login-area">
        <div class="login-form">
          <el-form
            :model="form"
            ref="loginForm"
            :rules="rules"
            label-width="80px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="form.password"
                placeholder="密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-row class="login-checkCode">
              <el-col :span="18">
                <el-form-item
                  prop="checkCode"
                  label="验证码"
                  label-width="80px"
                >
                  <el-input
                    v-model="form.checkCode"
                    placeholder="验证码"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1"></el-col>
              <el-col :span="5">
                <el-input
                  v-model="createCheckCode"
                  class="checkCodeInput"
                  :disabled="true"
                ></el-input>
              </el-col>
            </el-row>
            <el-form-item label="">
              <el-button
                type="primary"
                @click="handleLogin('loginForm')"
                class="login-button"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { login } from "../api/api";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      createCheckCode: "",
      form: {
        username: "",
        password: "",
        checkCode: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "账号不能为空！",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空！",
            trigger: "blur",
          },
        ],
        checkCode: [
          {
            required: true,
            message: "您还没输入验证码！",
            trigger: "blur",
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
    /* 点击登录 */
    handleLogin: function (loginForm) {
      this.$refs[loginForm].validate(async (valid) => {
        if (valid && this.form.checkCode === this.createCheckCode) {
          let result = await login({
            user_name: this.form.username,
            password: this.form.password,
          });
           console.log(result);
          if (result.status === 1) {
            this.$message({
              type: "success",
              message: "登陆成功",
            });
            localStorage.setItem("is_login", "true");
            this.$router.push({
              path: "/dashboard",
            });
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
          let arr = [];
          for (let i = 0; i < 4; i++) {
            arr[i] = Math.floor(Math.random() * 10);
          }
          this.createCheckCode = arr.join("");
          this.form.checkCode = "";
        }
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let arr = [];
    for (let i = 0; i < 4; i++) {
      arr[i] = Math.floor(Math.random() * 10);
    }
    this.createCheckCode = arr.join("");
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
.loginpage {
  background-image: url(../assets/loginbg.jpg);
  .mylogin {
    padding-top: 250px;
    height: 100vh;
    h1 {
      color: #fff;
      font-size: 40px;
      text-align: center;
    }
    .login-area {
      width: 500px;
      height: 330px;
      background-color: rgba(255, 255, 255, 0.7);
      margin: 20px auto;
      border-radius: 6px;
      .login-form {
        padding: 50px 80px 10px 10px;
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
      .login-checkCode {
        display: flex;
      }
      .checkCodeInput {
        font-size: 20px;
      }
    }
  }
}
</style>
