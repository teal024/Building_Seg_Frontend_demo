<!-- 侧边栏页面 -->
<template>
    <el-aside width=100%>
        <h2>LOGO</h2>
        <el-menu :default-active="defaultActive" router class = "menu">
            <el-sub-menu index="dashboard">
                <template #title>
                    <span style="color:rgb(204, 204, 204);">功能</span>
                </template>
                <el-menu-item index="dashboard">仪表盘</el-menu-item>
                <el-menu-item index="segmentation">图像分割处理</el-menu-item>
                <el-menu-item index="explosion_identify">玻璃内爆识别</el-menu-item>
                <el-menu-item index="vibration">风振数据显示</el-menu-item>
                <el-menu-item index="3Dmodel">3D模型</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="database">
                <template #title>
                    <span style="color:rgb(204, 204, 204);">数据库</span>
                </template>
                <el-menu-item index="pics">保存的图片</el-menu-item>
                <el-menu-item index="vibration_data">风振数据</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="personal" style="color:rgb(226, 226, 226);">
                个人中心
            </el-menu-item>
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
const defaultActive = ref('dashboard')

</script>

<style scoped>
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

</style>