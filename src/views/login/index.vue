<!-- 登录页面 -->
<template>
    <div>本页面为登录页面</div>
    <el-button @click="GoToLayout">点击跳转排版页面</el-button>
</template>

<script setup>
import router from "@/router/index.js"

const GoToLayout = () => {
    router.push({ 
        name: 'layout', 
        params:{ 
            choice:'dashboard' 
        } 
    })
}
</script>

<style scoped>

</style>