# 药品销售管理系统

## 一、项目技术栈

- ### Vue

- ### Vue-router

- ### Vuex

- ### Element-UI

- ### Axios

- ### Echats

## 二、项目初始化

1. 安装 Vue 脚手架
2. 通过 Vue-Cli 创建项目
3. 配置 Vue-router
4. 配置 Element-UI 组件库
5. 配置 Axios 库
6. 初始化 git 远程仓库

## 三、模块构成和实现分析

### 1.登陆业务

### 登录流程

1. 输入用户名、密码和验证码
2. 调用接口验证
3. 通过验证则跳转项目主页

### 技术点

1. 使用element-UI的表单属性`rules`进行属性绑定，指定验证规则对象
2. 使用表单方法`validate`进行表单验证
3. 使用了简单的local storage保存登录状态，只有登录成功才能访问系统中的其他页面

### 登陆页面模板

```html
<template>
<div class=''>
  <div class="mylogin">
    <h1>药品仓库管理系统</h1>
    <div class="login-area">
      <div class="login-form">
        <el-form :model="form" ref="loginForm" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="密码" show-password></el-input>
          </el-form-item>
          <el-row class="login-checkCode">
            <el-col :span="16">
              <el-form-item prop="checkCode" label="验证码" label-width="80px">
                <el-input v-model="form.checkCode" placeholder="验证码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="5">
              <el-input v-model="createCheckCode" class="checkCodeInput" :disabled="true"></el-input>
            </el-col>
          </el-row>
          <el-form-item label="">
            <el-button type="primary" @click="handleLogin('loginForm')" class="login-button">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</div>
</template>
```

### 登录逻辑代码

```js
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
  //这里存放数据
  return {
    createCheckCode:"",
    form: {
      username:"",
      password:"",
      checkCode:"",
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
      ],
      checkCode:[
        {
          required:true,
          message:"您还没输入验证码！",
          trigger:"blur"
        }
      ]
    }
  };
},
methods: {
  /* 点击登录 */
  handleLogin: function (loginForm) {
    // 表单验证
    this.$refs[loginForm].validate(async (valid) => {
      if (valid && this.form.checkCode===this.createCheckCode) {
       let result = await login({
            user_name: this.form.username,
            password: this.form.password,
       });
      //  console.log(result);
        if (result.status === 1) {
          this.$message({
            type: "success",
            message: "登陆成功",
          });
          localStorage.setItem("is_login","true");
          this.$router.push({
            path:"/dashboard"
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
        for(let i = 0;i<4;i++){
          arr[i] = Math.floor(Math.random()*10);
        }
        this.createCheckCode = arr.join('');
        this.form.checkCode = "";
      }
    });
  },
},
```



# 药品基础信息模块

### 1、查询关键词药品信息

#### 技术点

- element-ul插件关键词过滤筛选
- 点击确定跳转搜索药品详情页
- 详情页对药品进行基于element-ui插件编辑删除操作

#### 查询逻辑跳转详情页

~~~js
 methods: {
    handleSearch: function () {
      if(this.state){
      this.$store.commit("search/mysearch",{
        filterResult:this.filterResult
      })
      this.$router.push("drug_details");
      }else{
        this.$message({
          type:"error",
          message:"搜索内容不能为空，请重新输入"
        })
      }
      
    },
    querySearch(queryString, cb) {
      //过滤 关键词
      let filterResult = this.drugData.filter((v, i) => {
        v.value = v.drugName;
        // console.log(v.value);
        // return v.value.includes(queryString);
        if (v.drugName.includes(queryString)) {
          return v.value;
        }
      });

      this.filterResult = filterResult;
      // console.log(this.filterResult);
      cb(filterResult);
    },
    handleSelect: function () {},

  },
~~~

### vuex状态管理

```js
const search = {
    namespaced: true,
    state: {
        //过滤后的药品信息
        newData: []
    },
    mutations: {
        //往库里传入搜索到的药品信息
        mysearch: function(state, payload) {
            state.newData = payload.filterResult;
        }
    },
    getters: {},
    actions: {},
    // modules:{}
}
export default search;
```



### 2、药品详情页

#### 药品信息校验进行编辑删除操作

~~~bash
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
~~~

### 3、查看基础信息页

#### 技术点

- 获取Vuex状态仓库数据，渲染表格
- 对信息进行编辑删除
- 表格底部分页效果

#### 源码

~~~~bash
data() {
    //这里存放数据
    return {
      editdialogVisible: false,
      tableData: [],
      total: 0, // 总的注册用户数
      pageSize: 10,
      currentPage: 1,
      pageSizes: [10, 15, 20, 25],
      ruleForm: {
        // name: "",
        // region: "",
        // factory: "",
        // note: "",
        // location: "",
        // unit: "",
        // specification: "",
        // barCode: "",
      },
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
    };
  },
  //监听属性 类似于data概念
  computed: {
    filterData: function () {
      let filterData = this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      return filterData;
    },
  },
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
      console.log(scope.row);
    },
    handleDelete: function (index, row) {
      // console.log("删除");
      row.splice(index, 1);
      this.total--;
      this.$message({
        type: "success",
        message: "删除成功！",
      });
    },
    handleSizeChange: function (pageSize) {
      this.pageSize = pageSize;
      // console.log(pageSize);
      this.currentPage = 1;
    },
    handleCurrentChange(currentPage) {
      console.log("改变页码");
      this.currentPage = currentPage;
    },
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    /* let flag= this.$store.state.addDrug.allDrugs.lenth;
    if (flag) {
      this.tableData = this.$store.state.addDrug.allDrugs;
    };
   
  }, */
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    //判断tableData的来源
    let result = await drugsSearch();
    // this.tableData = result.data;
    if (this.$store.state.addDrug.allDrugs.length === 0) {
      this.$store.commit("addDrug/savePrevAllDrug", {
        allDrugs: result.data,
      });
      // console.log(result.data);
      //
      this.tableData = result.data;
    } else {
      this.tableData = this.$store.state.addDrug.allDrugs;
    }
    this.total = this.tableData.length;
  },
~~~~

### 4、添加药品页

#### 技术点

- element-ul表单验证
- 点击创建成功跳转到查看药品信息页

#### 业务逻辑

~~~bash
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
~~~

### vuex状态管理

```js
const addDrug = {
    namespaced: true,
    state: {
        //原来的仓库药品
        allDrugs: [],
        //新添药品
        saveDrug: {},

    },
    mutations: {
        // 保存更新前的所有药品信息
        savePrevAllDrug: function(state, payload) {
            state.allDrugs = payload.allDrugs;
        },
        // 添加新药品信息
        saveNewDrug: function(state, payload) {
            state.saveDrug = payload.newDrug;
            // 添加新药品
            state.allDrugs.unshift(state.saveDrug);
            // state.saveDrug = {};
            // console.log(state.allDrugs);
        },
    },
    getters: {},
    actions: {}
}
export default addDrug;
```





# 进货信息模块

## 	药品审核入库

### 1、查询需要购进何种药品

#### 技术点

- 根据输入字段对已有药品名称进行过滤筛选
- 点击查询跳转至显示查询结果的页面

#### 查询逻辑

```js
export default {
//import引入的组件需要注入到对象中才能使用
components: {}, 
data() {
//这里存放数据
return {
  // 所有药品数据
  allDrugData:[],
  // 返回的搜索数据
  searchDrugData:[],
  // 提示数据
  loadAll:[],
  // 输入的查询字段
  drug_name:"",
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  /* 点击查询药品信息，若输入为空，查询所有 */
  handleSearch: function(){
    // 把查询匹配的数据保存在store中
      this.$store.commit('purchaseDrug/mapSearch',{
        allDrugData:this.allDrugData,
        // 对查询字段两端空格
        drug_name: this.drug_name.trim(),
      });
      this.$router.push("searchAllDrug");
  },
  handleCheckIn: function(){

  },

  /* 
    输入提示
  */
  querySearch(queryString, cb) {
    var drugnames = this.loadAll;
    var results = queryString ? drugnames.filter(this.createFilter(queryString)) : drugnames;
    // 调用 callback 返回建议列表的数据
    cb(results);
  },
  createFilter(queryString) {
    return (drugnames) => {
      return (drugnames.value.indexOf(queryString) != -1);
    };
  },
  handleSelect(item) {
    console.log(item);
  }
},
```



### 2、匹配查询结果页面

### 	技术点

- #### 对匹配数据进行分页展示

- #### 点击添加药品，利用vuex状态管理工具保存匹配到对应药品的信息，并跳转至订单详细信息填写页面

#### 分页逻辑和匹配对应药品信息

```js
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  // 上级查询的结果
  tableData: [],
  // 选中的药品数据
  chosenDrugL:{},
  pageSizes:[5,10,15],
  pageSize:10,
  currentPage:1,
  totalItem:0,
};
},
//监听属性 类似于data概念
computed: {
  // 计算分页时需要渲染的数据
  filterData: function(){
    let filterData = [];
    filterData = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
    return filterData;
  },
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  purchaseThisDrug: function(index,row){
    // console.log(index);
    // 把选中的数据保存在store中，用于渲染下级详细数据
    this.$store.commit('purchaseDrug/choseDrug',{
      chosenDrug:this.tableData[index],
    })
    this.$router.push('add_drug_msg');
  },
  /* 分页操作 */
  handleSizeChange: function(pageSize){
    this.pageSize = pageSize;
    this.currentPage = 1;
  },
  handleCurrentChange:function(currentPage){
    this.currentPage = currentPage;
  }
},
```

### 3、订单详情页

#### 技术点

- #### 利用vuex管理工具，获取上一级选择的药品基本信息，在详情页中渲染已有信息

- #### form表单验证

- #### 从vuex状态管理中获取到供货商的数据，自动跳出可选项

- #### 同时利用vuex，保存本次订单的信息，让订单记录页面能同步更新获取到新的订单信息

#### 业务逻辑

```js
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
```



## 进货记录

#### 技术点

- #### 从vuex获取最新的订单记录

- #### 分页展示数据

#### 业务逻辑

```js
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  // 上级查询的结果
  tableData: [],
  // 选中的药品数据
  chosenDrugL:{},
  pageSizes:[5,10,15],
  pageSize:10,
  currentPage:1,
  totalItem:0,
};
},
//监听属性 类似于data概念
computed: {
  // 计算分页时需要渲染的数据
  filterData: function(){
    let filterData = [];
    filterData = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
    return filterData;
  },
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  purchaseThisDrug: function(index,row){
    // console.log(index);
    // 把选中的数据保存在store中，用于渲染下级详细数据
    this.$store.commit('purchaseDrug/choseDrug',{
      chosenDrug:this.tableData[index],
    })
    this.$router.push('add_drug_msg');
  },
  /* 分页操作 */
  handleSizeChange: function(pageSize){
    this.pageSize = pageSize;
    this.currentPage = 1;
  },
  handleCurrentChange:function(currentPage){
    this.currentPage = currentPage;
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
},
//生命周期 - 挂载完成（可以访问DOM元素）
async mounted() {
  // let result = await getDrugMessage();
  // this.tableData = result.data;
  this.tableData = this.$store.state.purchaseDrug.searchDrugData;
  this.totalItem = this.tableData.length;
}
```

## 	供货商管理

#### 技术点：

- 从接口中获取到供货商的数据信息，并保存到vuex仓库中
- 增加供货商
- 删除供货商

#### 业务逻辑

```js
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  newSupplierName:"",
  newSupplierAddres:"",
  supplierData:[],
  dialogFormVisible: false,
  form: {
    supplierName: '',
    supplierAddress: '',
  },
  formLabelWidth: '120px'
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
  handleAddSupplier:function(){
    // 添加到最前面
    if(this.newSupplierName.trim() && this.newSupplierAddres.trim()){
      this.supplierData.unshift({
        supplier: this.newSupplierName,
        address: this.newSupplierAddres
      });
      this.$message({
        type: "success",
        message: "添加成功",
      });
      this.newSupplierName = '';
      this.newSupplierAddres = '';
    }else{
      this.$message({
        type: "warning",
        message: "添加失败！请输入正确信息",
      });
      this.newSupplierName = '';
      this.newSupplierAddres = '';
    }
  },
  // 删除供应商
  handleDeleteSupplier: function(index,row){
    this.$confirm('此操作将删除该项信息, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.supplierData.splice(index,1);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    });
    console.log(this.supplierData);
    // this.supplierData.splice(index,1);
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
async mounted() {
  let result = await getSupplier();
  this.supplierData = result.data;
  /* console.log(this.tableData);
  console.log(result.data); */
}
```

### vuex状态管理部分

```js
const purchaseDrug = {
  namespaced: true,
  state: {
    /* 
      以下是进货模块的状态存储 
    */

    /* 管理药品入库时搜索的药品 */
    searchDrugData:[],
    /* 匹配选择的药品 */
    chosenDrug:{},
    /* 供应商的提示数据在这里存储 */
    suppliers:[],
    /* 原来的进货记录 */
    allRecord:[],
    /* 审核入库的订单记录信息 */
    newPurchaseRecord:{},
    /* 供货商的数据存储 */
    allsuppliers:[],
    /* 新增供货商的信息 */
    newSupplier:{},

  },
  mutations: {
    /* 
      以下是进货模块的状态更改 
    */

    /* 管理药品入库时搜索的药品名称 */
    mapSearch:function(state,payload){
      if(!payload.drug_name){
        state.searchDrugData = payload.allDrugData;
      }else {
        state.searchDrugData = [];
        payload.allDrugData.map((item,index)=>{
          if(item.drugName.indexOf(payload.drug_name) != -1){
            state.searchDrugData.push(item);
          }
        });
      }
    },
    /* 匹配选择哪一种具体的药品，保存其信息 */
    choseDrug:function(state,payload){
      state.chosenDrug = payload.chosenDrug;
    },
    /* 加载原来的进货订单 */
    saveprevRecord:function(state,payload){
      state.allRecord = payload.allRecord;
    },
    /* 保存审核入库的订单记录信息 */
    saveNewRecord: function(state,payload){
      state.newPurchaseRecord = payload.newPurchaseRecord;
    },
    /* 更新总订单 */
    updateAllRecord:function(state){
      /* 进货订单添加最新记录 */
      /* 如果最新记录中为空 则不执行操作 */
      if(!state.newPurchaseRecord.drugName){
        return state.allRecord;
      }
      /* 把最新记录添加到总订单记录中 */
      state.allRecord.unshift(state.newPurchaseRecord);
      /* 让最新订单记录回到空 */
      state.newPurchaseRecord = {};
    }

  },
  actions: {
  },
  getters:{
  },
  modules: {
  }
}
export default purchaseDrug;
```



# 药品库存信息模块

### 	库存药品查询

### 1、查询需要购进何种药品

#### 技术点

- #### 根据输入字段对已有药品名称进行过滤筛选

- #### 引入echarts展示药品分类信息

- #### 点击查询跳转至显示查询结果的页面

查询逻辑

```js
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    "my-charts": Charts,
  },
  data() {
    //这里存放数据
    return {
      state: "",
      result: [],
      flag: false,
      newdrug: "",
      filterResult:[],
 
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    querySearch: function (queryString, cd) {
      // console.log(queryString); //相当于同步输出你输入在建议搜索框里的内容
      let filterResult = this.result.filter((v, i) => {
        // 还是全部输出所有店铺数据，还没有进行过滤
        // console.log(v);
        // console.log(v.value);//各个店铺的名字
        v.value = v.data;
        if (v.data.includes(queryString)) {
          return { value: v.data };
        }
      });
      console.log(filterResult); //这个输出根据输入筛选后的匹配项的结果
      this.filterResult=filterResult
      cd(filterResult); //需要这样一个回调，将过滤好的数据渲染出来
    },
    handleSelect: function (value) {
      console.log("选的药是：", value.data);
      this.newdrug = value.data;
      console.log(this.newdrug);
    },
    handleSearch: function () {
      // if (this.newdrug === this.$refs["inputRef"].value) {
        this.$store.commit("searchInventory",{
         searchResult: this.filterResult
        })
        this.$router.push("drugtable");

        this.$message({
          type: "success",
          message: "这个药品还有库存哟",
        // });
      // } else {
      //   this.$message({
      //     type: "warning",
      //     message: "没有这个药品哟，有可能没库存了",
      //   });
      })
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    let result = await getInventory();
    console.log(result);
    let newResult = result.data.map((v, i) => {
      return v;
    });
    console.log(newResult);
    this.result = newResult;
    // console.log(result.data[0].factory);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
```



### 2、匹配查询结果页面

### 	技术点

- #### 对匹配数据进行分页展示

- #### 利用vuev工具对查询页面关键字查找数据进行存储，并在这结果页面进行获取state数据渲染

- #### 点击编辑药品，利用插槽的知识保存匹配到对应药品的信息，并提供表格数据实时双向绑定

- #### 点击删除按钮，删除对应表格数据

#### 分页逻辑和匹配对应药品信息

```js
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [],
      state1: "",

      form: {}, // 弹出表格信息
      barCode1: "",
      dialogVisible: false, // 弹出窗口显示或者隐藏
      pickerOptions: {
        //日期快捷键功能
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
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
  deleteRow(index,rows){//删除
    rows.splice(index,1);
    },
    handleNoChange: function (form) {
      // this.$nextTick(()=>{
      this.$refs.form.resetFields();

      // })
      // this.dialogVisible = false;
    },
    handleEdit: function (scope) {
      // 显示弹出窗口
      // scope.row => 一行的信息
      this.dialogVisible = true;
      // 把数据赋值给表格
      this.form = scope.row;
      this.barCode1 = this.form.barCode;
      console.log(scope);
    },
    handleDelete: function (scope) {},
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.tableData = this.$store.state.searchData;
    console.log(this.tableData);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
```

### 3、新增库存药品

#### 技术点

- #### 利用走马灯展示库存预警的药品

- #### 从vuex状态管理中获取到查询药品的数据，自动跳出结果页面

- #### 同时利用vuex，保存本次订单的信息，让订单记录页面能同步更新获取到新的订单信息

#### 业务逻辑

```js
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    "my-charts": Charts,
  },
  data() {
    //这里存放数据
    return {
      state: "",
      result: [],
      drugData:[],
      flag: false,
      newdrug: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    querySearch: function (queryString, cd) {
      // console.log(queryString); //相当于同步输出你输入在建议搜索框里的内容
      let filterResult = this.result.filter((v, i) => {
        // 还是全部输出所有店铺数据，还没有进行过滤
        // console.log(v);
        // console.log(v.value);//各个店铺的名字
        v.value = v.data;
        if (v.data.includes(queryString)) {
          return { value: v.data };
        }
      });
      this.drugData=filterResult
      console.log(this.drugData); //这个输出根据输入筛选后的匹配项的结果
      cd(filterResult); //需要这样一个回调，将过滤好的数据渲染出来
    },
    handleSelect: function (value) {
      console.log("选的药是：", value.data);
      this.newdrug = value.data;
      console.log(this.newdrug);
    },
    handleSearch: function () {


    //   if (this.newdrug === this.$refs["inputRef"].value) {

          this.$store.commit('mapSearch',{
              drugData:this.drugData
          })


        this.$router.push("adddruglist");
        this.$message({
          type: "success",
          message: "这个药找到了",
    //     });
    //   } else {
    //     this.$message({
    //       type: "warning",
    //       message: "没有这个药品哟",
    //     });
    //   }
    })
   }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    let result = await getAddDrug();
    console.log(result);
    let newResult = result.data.map((v, i) => {
      return v;
    });
    console.log(newResult);
    this.result = newResult;
    // console.log(result.data[0].factory);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
```



### 	需要添加库存页面

#### 技术点

- #### 从vuex获取对应的查询存储数据

- #### 点击确定添加按钮，利用vuex工具存储对应数据并跳转数据编辑页面进行修改

#### 业务逻辑

```js
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [],
      state1: "",
      row:[],
     }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleAddDrug: function (index,rows) {
// console.log(rows[index]);
    this.row=rows[index]
    console.log(this.row);
        this.$store.commit("addDrugIn",{
            newDrugNews:this.row
        })
      this.$router.push("adddrugnews");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
     this.tableData = this.$store.state.searchDrug;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
   
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
```

### 	库存药品具体数据编辑

#### 技术点：

- #### 设置规则，默认固定不可修改数据

- #### 点击确认修改保存数据如vuex并跳转到库存列表页

#### 业务逻辑

```js
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
```





# 药品库存预警模块

####  **技术点**

- 从接口中获取到库存预警数据信息，并保存到vuex仓库中

- 用element ui 建立表格

- 对药物数量进行筛选

    #### 页面模板

    ````html
    <template>
      <div class="">
        <h2 class="head">库存数量预警</h2>
        <el-table :data="tableData" height="915" border style="width: 100%">
          <el-table-column prop="drugName" label="药品名称" width="200">
          </el-table-column>
          <el-table-column prop="factory" label="厂商" width="200">
          </el-table-column>
          <el-table-column prop="sellPrice" label="销售价格" width="150">
          </el-table-column>
          <el-table-column prop="effectiveDate" label="有效期至" width="150">
          </el-table-column>
          <el-table-column prop="batchNumber" label="批号" width="180">
          </el-table-column>
          <el-table-column prop="note" label="备注" width="150"> </el-table-column>
          <el-table-column prop="unit" label="单位" width="100"> </el-table-column>
          <el-table-column prop="specification" label="规格" width="180">
          </el-table-column>
          <el-table-column
            prop="number"
            label="筛选数量"
            :filters="[
              { text: '1', value: '1' },
              { text: '2', value: '2' },
              { text: '3', value: '3' },
              { text: '4', value: '4' },
              { text: '5', value: '5' },
              { text: '6', value: '6' },
              { text: '7', value: '7' },
              { text: '8', value: '8' },
              { text: '9', value: '9' },
              { text: '10', value: '10' },
              { text: '20', value: '20' },
            ]"
            :filter-method="filterHandler"
          >
          </el-table-column>
        </el-table>
      </div>
    </template>
    ````

    #### 业务逻辑

    ````js
    <script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import { drugWarning } from "@/api/api";
    export default {
      //import引入的组件需要注入到对象中才能使用
      components: {},
      data() {
        //这里存放数据
        return {
          tableData: [],
        };
      },
    
      //监听属性 类似于data概念
      computed: {},
      //监控data中的数据变化
      watch: {},
      //方法集合
      methods: {
        filterHandler(value, row, column) {
          const property = column["property"];
          return (row[property] <= Number(value));
        },
      },
    
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {},
      async mounted() {
        //生命周期函数，挂载完成
        let result = await drugWarning();
        console.log(result);
        this.tableData = result.data;
      }
    };
    </script>
    <style  scoped>
    .head {
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 30px;
    }
    </style>
    ````

    

# 药品销售记录模块

#### 技术点

- 从接口中获取到库存预警数据信息，并保存到vuex仓库中

- 用element ui 建立表格

- 对药物数量进行筛选

    #### 页面模板

    ````html
    <template>
    <div class="App">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        max-height="952">
        <el-table-column
          fixed
          prop="drug_name"
          label="药品名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="factory"
          label="厂商"
          width="250">
        </el-table-column>
        <el-table-column
          prop="sellingPrice"
          label="销售价格"
          width="80">
        </el-table-column>
        <el-table-column
          prop="effective_date"
          label="有效期至"
          width="130">
        </el-table-column>
        <el-table-column
          prop="batchNumber"
          label="批号"
          width="130">
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
          width="80">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
          width="80">
        </el-table-column>
        <el-table-column
          prop="specification"
          label="规格"
          width="160">
        </el-table-column>
        <el-table-column
          prop="number"
          label="数量"
          width="80">
        </el-table-column>
        <el-table-column
          prop="money"
          label="金额"
          width="80">
        </el-table-column>
        <el-table-column
          prop="deal_time"
          label="交易时间"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="danger"
              size="middle">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </template>
    ````

    #### 业务逻辑

    ````js
    <script>
    import {drugSell} from "@/api/api"
      export default {
        methods: {
          deleteRow(index, rows) {
            rows.splice(index, 1);
          }
        },
        data() {
          return {
            tableData: []
          }
        },
        
       async mounted(){//生命周期：挂载完成  
        let result = await drugSell();
        console.log(result);
        this.tableData = result.data
        }   
      }
    </script>
    ````

    

    

    ## 问题小结

    ### 1、静态的接口数据，无法对接口中的数据进行增删改查

    ### 2、表单验证待完善（添加新药品信息，还没对仓库中是否已存在该药品进行判断）

    ### 3、页面风格比较单调，后期可以再进行美化