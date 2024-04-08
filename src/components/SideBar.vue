<!-- 侧边栏页面 -->
<template>
    <el-aside width=100%>
        <img class="logo" src="../img/logo.png">
        <el-menu :default-active="defaultActive" router class = "menu" index="segmentation" style="color:rgb(204, 204, 204);">
            <el-menu-item index="admin_authorize">管理员授权</el-menu-item>
            <el-menu-item index="segmentation">图像分割处理</el-menu-item>
            <el-menu-item index="seg_history">图像分割记录</el-menu-item>
        </el-menu>
    </el-aside>
</template>
  

<script setup>
import router from "@/router/index.js"
import { ref } from 'vue'

const showManagement = ref(true)
const handleSelectMenu = (choice) => {
    router.push({ name: 'layout', params:{ choice:choice } })
}
const defaultActive = ref('segmentation')

</script>

<!-- <style scoped>
.menu{
    position:absolute;
    top:10%;
    left:0%;
    width:100%;
    background-color: rgb(40, 68, 121);
}
.el-sub-menu .el-menu-item {
  background-color: rgb(54, 91, 156) !important;
  color:rgb(204, 204, 204);

}

/* 设置选鼠标指针浮动在一级菜单的设置 */
.el-menu-item:hover{
  background-color: rgb(235, 235, 235) !important;;
}
/* 设置当前被选中的一级菜单 */
.el-menu-item.is-active {  
  color: white !important;  
  background: black !important;  
}  

</style> -->

<style scoped>
.logo {
  max-width: 95%;
}

.menu{
    position:absolute;
    top:10%;
    left:0%;
    width:100%;
    background-color: rgb(74, 131, 229);
}
.el-sub-menu .el-menu-item {
  background-color: rgb(54, 91, 156) !important;
  color:rgb(225, 225, 225);
  
}

/* 设置选鼠标指针浮动在一级菜单的设置 */
.el-menu-item:hover{
  background-color: rgb(54, 91, 156) !important;;
}
/* 设置当前被选中的一级菜单 */
.el-menu-item.is-active {  
  color: rgb(54, 91, 156) !important;  
  background: white !important;  
}  

</style>