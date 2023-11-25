import Request from "@/utils/Request.js";  // 在每个 api 文件里都要引入这两个文件
import Message from "@/utils/Message.js"  // 在每个 api 文件里都要引入这两个文件
import router from "@/router/index.js"

// 图像上传
export function UploadImg(FormData) {  // 在 src/views/login/index.vue 里调用，可以去看看是如何调用的
    return Request({  // 发送请求
        method: 'POST',
        headers: {
            'Content-Type': 'application/form-data', // 设置请求头
        },
        url: '/backend/saveimage/',  // 与后端接口对应！！！
        data: FormData, // 使用FormData作为请求体
    }).then(function (response) {  // then 表示成功接收到响应后的操作
        if (response.status === 200) {
            Message.success("操作成功");
            
            console.log(response.data); // 检查返回的数据
            return response;  //  // 正确响应，返回数据
        } else {
            Message.error("操作失败");
        }
    }).catch(function (error) {  // catch 表示接收到错误响应后的操作
        console.log(error);
    });
}