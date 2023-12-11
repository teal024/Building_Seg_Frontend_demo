<!-- 图像分割页面 -->
<template>

    <div>这是管理员图像分割页面</div>
    <el-button @click="GoToDash">进入仪表盘</el-button>
    <div class="container">
        <ImgUploader ref="ImgUploadRef" @uploadPicture ="upload" @onCancel="cancel"/>
    </div>
    <div class="centered-element" v-if="showProgress">
        <el-progress type="circle" :text-inside="false" :stroke-width="18" :percentage="per"></el-progress>
    </div>
    <div class="result-img-table" v-if="!showProgress">
        <ResultImgTable :tableData="ImgResult"/>
    </div>
    
</template>

<script setup>
import { ref }from 'vue'
import axios from 'axios'
import router from "@/router/index.js"
import Request from "@/utils/Request.js"
import Message from "@/utils/Message.js"
import ImgUploader from '@/components/ImgUploader_batch.vue'
import ResultImgTable from '@/components/ResultImgTable.vue'
import {UploadBatchImg, SegSingleImg, GetSegResult, GetImgByDate } from '@/api/segmentation_admin.js'
import { timePanelSharedProps } from 'element-plus/es/components/time-picker/src/props/shared'

// const fileList = ref();
const ImgUploadRef = ref(null); //上传的图片
var ImgResult = []; //分割后获得的图片
// 这里是一个响应式变量

var per = ref(0); // 进度条当前百分比
var showProgress = true; // 展示进度条

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
    const fileList = val.fileList;
    console.log("num of uploaded images : ", fileList.length);
    showProgress = true;
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

// const after_upload = (result) => {
//     // ImgResult.value = result.data;
//     const ImgNum = result.data['images'].length;
//     for (let i = 0; i < ImgNum; i++) {
//         let formData = new FormData();
        
//         formData.append('image_id', result.data['images'][0]);
        
//         Request({  // 发送请求
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/form-data', // 设置请求头
//             },
//             url: '/backend/seg_single_image_from_to_db/',  // 与后端接口对应！！！ 
//             data: formData, 
//         }).then(function (response) {  // then 表示成功接收到响应后的操作
//             if (response.status === 200) {
//                 Message.success("操作成功");
//                 return response;  //  // 正确响应，返回数据
//             } else {
//                 Message.error("操作失败");
//             }
//         }).catch(function (error) {  // catch 表示接收到错误响应后的操作
//             // console.log("Request URL: ", Url);
//             // console.log("Request Method: ", Method);
//             console.log("Request Data: ", FormData);
//             console.error("Error: ", error);
//         });

//         per.value = (i + 1) * 100.0 / ImgNum;
//         console.log("per", per);
//     }
// }

const after_upload = async (result) => {
    const ImgNum = result.data['images'].length;

    // Define an async function to process a single image
    const processImage = async (index) => {
        let formData = new FormData();
        formData.append('image_id', result.data['images'][index]);

        try {
            const segmentationResult = await SegSingleImg(formData);
            console.log("Seg Done", segmentationResult);
        } catch (error) {
            console.error("Error in SegSingleImg:", error);
        }

        per.value = (index + 1) * 100.0 / ImgNum;
        if (index == ImgNum - 1) {
            showProgress = false;
        }
        console.log("per", per);
    };

    // Use a for...of loop to avoid the closure issue
    for (let i = 0; i < ImgNum; i++) {
        await processImage(i);
    }
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
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        height: 40vh; 
    }

    .centered-element {
    }

    .result-img-table {
        margin-top: 2%;
    }
</style>