<!-- 用于存放批量处理结果的列表 -->

<template>
  <el-table
    :data="imageList"
    class="image-table">
    <el-table-column
      prop="processingTime"
      label="处理时间">
    </el-table-column>
    <el-table-column
      prop="thumbnail"
      label="缩略图">
      <!-- <template slot-scope="scope">
        <img :src="scope.row" alt="缩略图" style="width: 50px; height: 50px; border-radius: 50%;">
      </template> -->
    </el-table-column>
    <el-table-column
      prop="labelList"
      label="分割结果">
    </el-table-column>
  </el-table>
</template>
  
  <style>
    /* .demo-table-expand {
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
    } */
    .image-table {
      margin: 60px; /* 左右边距 */
      width: calc(100% - 120px); /* 表格宽度减去左右边距 */
    }
  </style>
  
  <script>
    export default {
      props: {
        imageList: {
            type: Array,
            // default: () => [],
            required: true,
        }
      },
      data() {
        return {
          
        }
      },
      methods: {
        clicked() {
          console.log("wow!", this.imageList);
        }
      },
    }
  </script>