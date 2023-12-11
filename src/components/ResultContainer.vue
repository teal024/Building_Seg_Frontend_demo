<template>
    <el-container class="result-container">
      <el-main class="result-gallery" v-loading="isload">
        <!-- Labels -->
        <el-checkbox-group v-model="selectedLabels" class="label-group">
          <el-checkbox v-for="(label, index) in uniqueLabels" :key="index" :label="label" border size="mini">
            {{ label }}
          </el-checkbox>
        </el-checkbox-group>
  
        <!-- Images -->
        <el-row class="resultrow" :gutter="20" justify="start">
          <el-card v-for="imageInfo in filteredImages" :key="imageInfo.id" :span="calculateSpan()" class="image-card">
            <img :src="imageInfo.src" class="image" alt="图片加载失败" />
            <div class="label">{{ imageInfo.label }}</div>
          </el-card>
        </el-row>
      </el-main>
    </el-container>
  </template>
  
  <script setup>
  import { ref, defineProps, computed, onMounted } from 'vue';
  import { ElCheckbox, ElRow, ElCard, ElCheckboxGroup } from 'element-plus';
  
  const isload = ref(false);
  
  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
  });
  
  const images = computed(() => props.data.pictures);
  const labels = computed(() => props.data.labels);
  
  const uniqueLabels = computed(() => [...new Set(labels.value)]);
  const selectedLabels = ref([...uniqueLabels.value]); // Initially select all labels
  
  const calculateSpan = () => {
    // Adjust the span based on the available space and image size
    const screenWidth = window.innerWidth;
    const cardWidthPercentage = 0.7; // Adjust this based on the desired width percentage
    const cardWidth = screenWidth * cardWidthPercentage;
    const minSpan = 1;
    const maxSpan = Math.floor(screenWidth / cardWidth);
    return Math.max(minSpan, Math.min(maxSpan, maxSpan));
  };
  
  const isVisible = (imageInfo) => {
    // Check if the image should be visible based on the selected labels
    return (
      selectedLabels.value.includes(imageInfo.label)
    );
  };
  
  const filteredImages = computed(() => {
    // Generate unique identifiers for each image and filter based on selected labels
    return images.value.map((src, index) => ({
      id: `image_${index}`,
      src,
      label: labels.value[index],
    })).filter(isVisible);
  });
  
  onMounted(() => {
    // Trigger a refresh when the component is mounted to ensure correct initial visibility
    selectedLabels.value = [...uniqueLabels.value];
  });
  </script>
  
  <style scoped>
  /* Add your styling here */
  .result-gallery {
    margin-left: 12%; /* Adjust the left margin to shift the result to the right */
  }
  
  .label-group {
    margin-bottom: 10px;
    margin-right: 14%;
  }
  
  .resultrow {
    margin: 20px 0; /* Add spacing between images and the page edges */
  }
  
  .image-card {
    margin-bottom: 20px; /* Add spacing between images */
    margin-right: 20px; /* Add a right offset */
    max-width: 16%;
  }
  
  .image {
    width: 100%;
    height: auto;
  }
  
  .label {
    text-align: center;
  }
  
  /* Button style modification */
  .el-checkbox__inner {
    background-color: white !important;
  }
  </style>
  