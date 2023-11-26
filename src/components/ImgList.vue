<template>
  <el-container class="result-container">
    <el-main class="result-gallery" v-loading="isload">
      <!-- 行 -->
      <el-row v-for="(image, index) in images" :key="index" class="resultrow" :gutter="20">
        <el-card class="result">
          <img :src="image" class="image" alt="图片加载失败" />
          <div class="label">{{ labels[index] }}</div>
        </el-card>
      </el-row>
    </el-main>
  </el-container>
</template>


  
  <script setup>
  import { computed } from 'vue'
  import { ref } from 'vue'
  import { ZoomIn, Download } from '@element-plus/icons-vue';
 
    // 模板使用coupon
    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    });
  
  const isload = ref(false);

  const images =  props.data.pictures;
  const labels = props.data.labels;

  </script>
  
  
  <style scoped>
  .result-container {
    padding: 3%;
    margin: 0 5% 5% 5%;
  }
  
  .result-gallery {
    position: relative;
  }
  
  .resultrow {
    margin-bottom: 30px;
  }
  
  .resultcol {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  
  .result {
    width: 200px;
    height: 200px;
    text-align: center;
    padding-bottom:30px;
  }
  
  .result-gallery .result .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    margin-bottom: 0;
  }
  
  .pagination {
    margin-top: 20px;
    justify-content: center;
    text-align: center;
    width: 100%;
  }

  .picture-container {
    margin:0 auto; 
    width:60vh;
    height:60vh;
    overflow: hidden; /* 隐藏超出容器的部分 */
  }

  .picture-container .picture {
    /* display: block; */
    width:100%;
    height:100%;
    object-fit:cover;
    object-position: center;
  }
  
  </style>