<!-- 用于存放批量处理结果的列表 -->

<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="图片 ID">
              <span>{{ props.row.key }}</span>
            </el-form-item>
            <el-form-item label="处理时间">
              <span>{{ props.row.timeIdx }}</span>
            </el-form-item>
            <el-form-item label="分割结果">
              <span>{{ props.row.value }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="图片 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="处理时间"
        prop="time">
      </el-table-column>
      <el-table-column
        label="分割结果"
        prop="results">
      </el-table-column>
    </el-table>
  </template>
  
  <style>
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  </style>
  
  <script>
    export default {
      props: {
        tableData: {
            type: Array,
            default: () => [],
        }
      },
      data() {
        return {
          
        }
      }
    }
  </script>