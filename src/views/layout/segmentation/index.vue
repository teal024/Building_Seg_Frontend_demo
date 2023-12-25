<!-- 图像分割页面 -->
<template>

    <!-- <el-button @click="GoToDash">进入仪表盘</el-button> -->
    <div class="container">
        <ImgUploader ref="ImgUploadRef" @uploadPicture ="upload" @onCancel="cancel"/>
    </div>
    <div class="progress-wrap" v-if="showProgress">
        <el-progress :text-inside="false" :stroke-width="18" :percentage="per" striped striped-flow></el-progress>
    </div>
    <!-- <div class="result-container" v-if="ImgResult">
        <ImgList :data="ImgResult"/>
    </div> -->
    <div class="carousel-container" v-if="ImgResult.length > 0">
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
import { UploadBatchImg, SegSingleImg, GetSegResult, GetImgByDate } from '@/api/segmentation.js'
import { timePanelSharedProps } from 'element-plus/es/components/time-picker/src/props/shared'

var ImgUploadRef = ref(null); // 上传的图片
var ImgResult = ref([]); // 分割后获得的图片
var fileList = ref(null);
const thumbnailUrl = ref(null);

var per = ref(0); // 进度条当前百分比
var showProgress = ref(false); // 控制是否展示进度条

// 跳转仪表盘页面
const GoToDash = () => {
    router.push({ 
        name: 'layout', 
        params:{ 
            choice:'dashboard' 
        } 
    })
}

// 批量上传图片
const upload = (val) => {
    fileList = val.fileList;
    console.log("num of uploaded images : ", fileList.length);
    let formData = new FormData();
    console.log("fileList : ", fileList);
    for (let i = 0; i < fileList.length; i++) {
        formData.append('image', fileList[i].raw);
    }
    
    UploadBatchImg(formData)
        .then(function (result) {
            console.log("upload Done", result);
            after_upload(result);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// 改变图片尺寸，用于生成缩略图
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

// 完成上传后，对图片进行分割和分类并展示结果
const after_upload = async (result) => {
    // 展示进度条
    showProgress.value = true;

    const ImgNum = result.data['images'].length;
    // 处理图片的异步函数
    const processImage = async (index) => {
        let formData = new FormData();
        formData.append('image_id', result.data['images'][index]);
        try {
            var segmentationResponse = await SegSingleImg(formData);
            const labels = segmentationResponse.data['label_list'];
            console.log("Seg Done", segmentationResponse);
            var segmentationResult = await GetSegResult(formData);
            // console.log("fileList[index].url ", fileList[index].url);
            resizeImage(fileList[index].url, 200, 200)
                .then(resizedUrl => {
                    thumbnailUrl.value = resizedUrl;
                    ImgResult.value.push({ 
                        // 被分割图片的路径
                        thumbnail: thumbnailUrl.value, 
                        // 分割得到的标签列表
                        labelList: [...new Set(labels)],
                        // 分割得到的各个图片局部及其标签
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

        // 更新进度条
        per.value = parseFloat(((index + 1) * 100.0 / ImgNum).toFixed(1));
        if (index == ImgNum - 1) {
            showProgress.value = false;
        }
        // console.log("per", per);
    };

    // 逐张处理上传的图片
    for (let i = 0; i < ImgNum; i++) {
        await processImage(i);
    }
};

// 取消上传
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
        margin-top: 60px;
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
        min-height: 600px;
        flex: 1;
    }
</style>