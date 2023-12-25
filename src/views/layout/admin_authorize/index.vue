<template>
    <!-- <el-button @click="GoToDash">进入仪表盘</el-button> -->
    <div class="page-wrap">
        <el-input v-model="filterKeyword" placeholder="请输入关键字搜索" />
        <el-table :data="filteredData">
        <el-table-column v-for="(header, index) in headers" :key="index" :label="header">
            <template v-slot="scope">
            <el-switch v-if="index !== 0 && scope.row.name" v-model="scope.row[header]" />
            <span v-else>{{ scope.row[header] }}</span>
            </template>
        </el-table-column>
        </el-table>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import router from "@/router/index.js"


  // 跳转仪表盘页面
    const GoToDash = () => {
        router.push({ 
            name: 'layout', 
            params:{ 
                choice:'dashboard' 
            } 
        })
    }
  
  const filterKeyword = ref('');
  const data = ref([
    { name: '用户1', 权限A: true, 权限B: false },
    { name: '用户2', 权限A: false, 权限B: true },
    { name: '用户3', 权限A: true, 权限B: true },
    { name: '同济', 权限A: false, 权限B: true }
  ]);
  
  const headers = ref(['name', '权限A', '权限B']);
  
  const filteredData = computed(() => {
    if (!filterKeyword.value) {
      return data.value;
    }
    return data.value.filter(item => item.name.includes(filterKeyword.value));
  });
  </script>
  
  <style scoped>
  .page-wrap {
    margin: 50px 50px 60px;
  }
  </style>
  