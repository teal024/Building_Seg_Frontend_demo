<template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="age" label="Age"></el-table-column>
      <el-table-column prop="address" label="Address"></el-table-column>
    </el-table>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { ElTable, ElTableColumn } from 'element-plus';
  
  interface TableItem {
    name: string;
    age: number;
    address: string;
  }
  
  const tableData = ref<TableItem[]>([
    { name: 'John Doe', age: 25, address: '123 Main St' },
    { name: 'Jane Doe', age: 30, address: '456 Oak St' },
    // Add more data as needed
  ]);
  
  </script>
  