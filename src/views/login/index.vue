<!-- 登录页面 -->
<template>
    <div>本页面为登录页面</div>
    <el-button @click="GoToManagerLayout">点击跳转管理员排版页面</el-button>
    <el-button @click="GoToUserLayout">点击跳转普通用户排版页面</el-button>
</template>

<script setup>
import router from "@/router/index.js"
import { useUserStore } from '@/store/user';
import { onMounted } from 'vue'

const userStore = useUserStore();

onMounted(() => {
    userStore.clearUserInfo()
});

const GoToManagerLayout = () => {
    userStore.userInfo.role = 'Manager'
    router.push({ 
        name: 'layout', 
        params:{ 
            choice:'dashboard' 
        } 
    })
}

const GoToUserLayout = () => {
    userStore.userInfo.role = 'User'
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