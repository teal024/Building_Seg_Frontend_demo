import Request from "@/utils/Request.js";  // 在每个 api 文件里都要引入这两个文件
import Message from "@/utils/Message.js"  // 在每个 api 文件里都要引入这两个文件
import router from "@/router/index.js"

export function sendRequest(Method, Url, FormData) {  
    return Request({  // 发送请求
        method: Method,
        headers: {
            'Content-Type': 'application/form-data', // 设置请求头
        },
        url: Url,  // 与后端接口对应！！！ 
        data: FormData, // Image list
    }).then(function (response) {  // then 表示成功接收到响应后的操作
        if (response.status === 200) {
            Message.success("操作成功");
            // console.log(response.data); // 检查返回的数据
            return response;  //  // 正确响应，返回数据
        } else {
            Message.error("操作失败");
        }
    }).catch(function (error) {  // catch 表示接收到错误响应后的操作
        console.log("Request URL: ", Url);
        console.log("Request Method: ", Method);
        console.log("Request Data: ", FormData);
        console.error("Error: ", error);
    });
}

// API 1  管理员上传多张图片，后端存储到数据库中，返回图片ID和对应批次号，以及这个批次的时间
export function UploadBatchImg(img) {
    return sendRequest('POST', '/backend/upload_batch_image/', img)
}

// API 2：管理员发送带ID的请求，后端处理相应图片并返回是否成功，处理结果共有多少张，并返回一个标签列表
export function SegSingleImg(ImageList) {
    return sendRequest('POST', '/backend/seg_single_image_from_to_db/', ImageList)
}

// API 3：管理员发送带ID的请求，后端从数据库中查询到对应图片并返回分割和分类结果
export function GetSegResult(id) {
    return sendRequest('POST', '/backend/get_segmented_images_for_image/', id)
}

// API 4：根据日期查询数据库中的图片（返回当日所有图片）
export function GetImgByDate(id) {
    return sendRequest('POST', '/backend/get_all_image/', id)
}
