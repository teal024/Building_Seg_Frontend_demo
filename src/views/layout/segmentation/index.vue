<!-- 图像分割页面 -->
<template>

    <div>这是图像分割页面</div>
    <el-button @click="GoToDash">进入仪表盘</el-button>
    <div>
        <ImgUploader ref="ImgUploadRef" @uploadPicture ="upload" @onCancel="cancel"/>
    </div>
    <div class="result-container" v-if="ImgResult">
        <ImgList :data="ImgResult"/>
    </div>

</template>

<script setup>
import { ref }from 'vue'
import axios from 'axios'
import router from "@/router/index.js"
import Message from "@/utils/Message.js"
import ImgUploader from '@/components/ImgUploader.vue'
import ImgList from '@/components/ResultContainer.vue'
import { UploadImg } from '@/api/segmentation.js'

// const fileList = ref();
const ImgUploadRef = ref(null); //上传的图片
const ImgResult = ref(null); //分割后获得的图片
// 这里是一个响应式变量

const GoToDash = () => {
    //跳转仪表盘页面
    router.push({ 
        name: 'layout', 
        params:{ 
            choice:'dashboard' 
        } 
    })
}

const upload = (val) =>{
    console.log(val.fileList[0].raw) //图片raw文件

    let formData = new FormData();
    formData.append('image', val.fileList[0].raw);
    formData.append('func', 'A');

    UploadImg(formData)
        .then(function (result) {  // result 是 api /user/login 的返回值，在后端 api 定义
            // 接收返回值，放在 person_info 变量中
            if(result.status == 200)
                after_upload(result);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const after_upload = (result) => {
    ImgResult.value = result.data;//后期需要修改，先这么写
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

</style>