<!-- 图像分割页面 -->
<template>

    <div>这是管理员图像分割页面</div>
    <el-button @click="GoToDash">进入仪表盘</el-button>
    <div class="container">
        <ImgUploader ref="ImgUploadRef" @uploadPicture ="upload" @onCancel="cancel"/>
    </div>
    <div class="centered-element" v-if="showProgress">
        <el-progress type="circle" :text-inside="true" :stroke-width="18" :percentage="per"></el-progress>
    </div>
    <div class="result-img-table" v-if="ImgResult.length">
        <ResultImgTable :tableData="ImgResult"/>
    </div>
    
</template>

<script setup>
import { ref }from 'vue'
import axios from 'axios'
import router from "@/router/index.js"
import Message from "@/utils/Message.js"
import ImgUploader from '@/components/ImgUploader_batch.vue'
import ResultImgTable from '@/components/ResultImgTable.vue'
import {UploadBatchImg, SegSingleImg, GetSegResult, GetImgByDate } from '@/api/segmentation_admin.js'

// const fileList = ref();
const ImgUploadRef = ref(null); //上传的图片
var ImgResult = []; //分割后获得的图片
// 这里是一个响应式变量

var per = "0"; // 进度条当前百分比
var showProgress = false; // 展示进度条
var ImgCnt = 0; // 已处理的图片总数
var ImgNum = 0; // 上传的图片总数

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
    console.log("num of uploaded images : ", val.fileList.length);
    ImgNum = val.fileList.length;
    showProgress = true;
    let formData = new FormData();
    console.log("fileList : ", val.fileList);
    for (let i = 0; i < val.fileList.length; i++) {
        formData.append('image', val.fileList[i].raw);
    }
    console.log("formData : ", formData);
    UploadBatchImg(formData)
        .then(function (result) {
            after_upload(result);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const after_upload = (result) => {
    // ImgResult.value = result.data;
    ImgCnt++;
    per = ImgCnt * 1.0 / ImgNum;

    const id = result.data["id"];
    Store_Seg_by_Id(id);
    const results = Get_Result_by_Id(id);
    ImgResult.append({"id": id, "time": t, "result": results.data["segmented_image_paths"]});

    print("ImgResult", ImgResult);
}
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
        align-self: center; /* 使用align-self属性使元素在交叉轴上居中 */
        /* 可以添加其他样式，使元素看起来符合你的设计需求 */
    }
</style>