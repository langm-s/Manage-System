<!-- 销售记录 -->
<template>
<div class="App">
  <el-table
    :data="tableData"
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
      width="150">
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
      width="120">
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
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

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
<style  scoped>

