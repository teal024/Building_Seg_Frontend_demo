<!-- 图像分割页面 -->
<template>

    <div>这是图像分割页面</div>
    <el-button @click="GoToDash">进入仪表盘</el-button>
    <div class="container">
        <ImgUploader ref="ImgUploadRef" @uploadPicture ="upload" @onCancel="cancel"/>
    </div>
    <div class="progress-wrap" v-if="showProgress">
        <el-progress :text-inside="false" :stroke-width="18" :percentage="per"></el-progress>
    </div>
    <!-- <div class="result-container" v-if="ImgResult">
        <ImgList :data="ImgResult"/>
    </div> -->
    <div class="carousel-container">
        <el-carousel class="carousel" :interval="0" arrow="always" indicator-position="outside" style="flex: 1;">
            <el-carousel-item v-for="(item,index) in ImgResult" :key="index">
                <ImgList :data="item"/>
            </el-carousel-item>
        </el-carousel>
    </div>
    
</template>

<script setup>
import { ref }from 'vue'
import axios from 'axios'
import router from "@/router/index.js"
import Request from "@/utils/Request.js"
import Message from "@/utils/Message.js"
import ImgList from "@/components/ResultContainer.vue"
import ImgUploader from '@/components/ImgUploader_batch.vue'
import ResultImgTable from '@/components/ResultImgTable.vue'
import {UploadBatchImg, SegSingleImg, GetSegResult, GetImgByDate } from '@/api/segmentation_admin.js'
import { timePanelSharedProps } from 'element-plus/es/components/time-picker/src/props/shared'

// const fileList = ref();
var ImgUploadRef = ref(null); //上传的图片
// const FileList = ref(null);
var ImgResult = ref([]); //分割后获得的图片
var fileList = ref(null);
const thumbnailUrl = ref(null);
// 这里是一个响应式变量

var per = ref(0); // 进度条当前百分比
var showProgress = ref(false); // 展示进度条
var processingTime = 0; // 当前批次图像处理时间

const GoToDash = () => {
    //跳转仪表盘页面
    router.push({ 
        name: 'layout', 
        params:{ 
            choice:'dashboard' 
        } 
    })
}

const upload = (val) => {
    fileList = val.fileList;
    console.log("num of uploaded images : ", fileList.length);
    let formData = new FormData();
    console.log("fileList : ", fileList);
    for (let i = 0; i < fileList.length; i++) {
        formData.append('image', fileList[i].raw);
    }
    // console.log("formData : ", formData);
    UploadBatchImg(formData)
        .then(function (result) {
            console.log("upload Done", result);
            after_upload(result);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const beforeUpload = (file) => {
  // 阻止自动上传
  return false;
};

const handleImageUpload = (file) => {
  // 将图片的 URL 保存到变量中
  imageUrl.value = URL.createObjectURL(file.raw);
};

function resizeImage(imageSrc, width, height) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg'));
    };
    img.onerror = reject;
    img.src = imageSrc;
  });
};

const after_upload = async (result) => {
    showProgress.value = true;
    processingTime = result.data['batch_time'];

    const timestamp = new Date(processingTime);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Shanghai', // 指定时区
    };

    processingTime = timestamp.toLocaleString('zh-CN', options);

    const ImgNum = result.data['images'].length;

    // Define an async function to process a single image
    const processImage = async (index) => {
        let formData = new FormData();
        formData.append('image_id', result.data['images'][index]);

        try {
            var segmentationResponse = await SegSingleImg(formData);
            const labels = segmentationResponse.data['label_list'];
            console.log("Seg Done", segmentationResponse);
            var segmentationResult = await GetSegResult(formData);
            console.log("fileList[index].url ", fileList[index].url);
            resizeImage(fileList[index].url, 200, 200)
                .then(resizedUrl => {
                    thumbnailUrl.value = resizedUrl;
                    ImgResult.value.push({
                        processingTime: processingTime, // 分割时间
                        thumbnail: thumbnailUrl.value, // 被分割图片的路径
                        // fileList[index].url,
                        labelList: [...new Set(labels)], // 分割出来各部分的标签
                        // pictures: segmentationResult.data['segmented_image_paths'], // 分割出来各部分的图片路径
                        pictures: labels.map((label, index) => ({
                            label: label,
                            image: segmentationResult.data['segmented_image_paths'][index]
                        }))
                    });
                    console.log(ImgResult.value, 'ImgResult')
                })
                .catch(error => {
                    console.error("Error resizing image:", error);
                });
        } catch (error) {
            console.error("Error in SegSingleImg:", error);
        }

        per.value = parseFloat(((index + 1) * 100.0 / ImgNum).toFixed(1));
        if (index == ImgNum - 1) {
            showProgress.value = false;
        }
        console.log("per", per);
    };

    // console.log("ref ", ImgUploadRef.value);
    // Use a for...of loop to avoid the closure issue
    for (let i = 0; i < ImgNum; i++) {
        // console.log("ImgRes: ", ImgResult);
        await processImage(i);
        // console.log("ImgRes: ", ImgResult);
    }
    // console.log("table", ImgResult);
};

const cancel = () => {
    ImgResult.value = [];
}


</script>

<style scoped>
    .upload-container{
        position:absolute;
        top:30%;
        left:5%;
    }

    .container {
        /* display: flex; */
        flex-direction: column;
        /* justify-content: space-between; */
        height: 40vh; 
    }

    .progress-wrap {
        max-width: 600px;
        margin: 20px auto 0; /* 上面的元素距离 .progress-wrap 的固定距离 */
        flex-direction: column;
        justify-content: space-between;
        object-fit: cover;
        display: flex;
        position: relative;
        top: 0; 
    }


    .result-img-table {
        margin-top: 2%;
    }

    .carousel-container {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        /* height: 100%; */
    }

    .carousel {
        min-height: 100% !important;
        flex: 1;
    }
</style>