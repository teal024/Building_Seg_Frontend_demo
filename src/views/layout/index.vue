<!-- 排版页面 -->
<template>
    <!-- 侧边栏区域begin -->
    <div class = "menu">
        <SideBar />
    </div>
    <!-- 侧边栏区域end -->
    <!-- 右侧功能区域begin -->
    <div class = "func-zone">
        <admin_authorize v-if="choice == 'admin_authorize'"/>
        <segmentation v-if="choice == 'segmentation'"/>
        <seg_history v-if="choice == 'seg_history'"/>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUpdated, computed} from 'vue'
import SideBar from '@/components/SideBar.vue'
import admin_authorize from '@/views/layout/admin_authorize/index.vue'
import segmentation from '@/views/layout/segmentation/index.vue'
import seg_history from '@/views/layout/seg_history/index.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user';

const route = useRoute();
const choice = ref('segmentation');//根据路由传值对应功能区的显示内容
const userStore = useUserStore();

// 监听路由变化并执行不同逻辑
onMounted(() => {
  updateLogic();
});
onUpdated(() => {
  updateLogic();
});

// 执行不同逻辑的函数
const updateLogic = () => {
  if (route.params.choice == 'admin_authorize') {
    choice.value = 'admin_authorize'
  } else if (route.params.choice === 'segmentation') {
    choice.value = 'segmentation'
  } else if (route.params.choice === 'seg_history') {
    choice.value = 'seg_history'
  }
};
</script>

<style scoped>
.menu{
    position: fixed;
    left:0%;
    top:0%;
    width:15%;
    height:100%;
    background-color: rgb(14, 16, 95);
    /* rgb(215, 215, 215); */
    color:rgb(54, 91, 156);
}
.func-zone{
  position: absolute;
  left:15%;
  top:0%;
  width:85%;
  height:100%;
}
</style>