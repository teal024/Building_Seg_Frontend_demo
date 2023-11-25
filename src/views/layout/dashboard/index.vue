<!-- 仪表盘页面 -->
<template>
    <div>这是仪表盘页面</div>
    <el-button @click="GoToSeg">进入图像分割</el-button>
    <el-button @click="GoToExp">进入玻璃内爆识别</el-button>
</template>

<script setup>
import router from "@/router/index.js"

const GoToSeg = () => {
    router.push({ 
        name: 'layout', 
        params:{ 
            choice:'segmentation' 
        } 
    })
}
const GoToExp = () => {
    router.push({ 
        name: 'layout', 
        params:{ 
            choice:'explosion_identify' 
        } 
    })
}
</script>

<style scoped>

</style>