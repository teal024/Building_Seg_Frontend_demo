<template>
    <div>这是振动数据风震图页面</div>
    <el-button @click="GoToDash">进入仪表盘</el-button>

    <div>
        <input type="file" ref="fileInput"  accept=".csv" @change="handleFileInputChange" />
        <button @click="uploadFile" :disabled="!selectedFile">上传文件</button>
    </div>
    <div id="main" style="width: 100%;height:400px;"></div>
</template>

<script setup>
    import router from "@/router/index.js"
    import { UploadCsv } from '@/api/vibration.js'
    import { ref, reactive } from 'vue'
    import * as echarts from 'echarts';

    const chartData = reactive({
        yData: {
          'x': [-0.02632,-0.09632,-0.05632,0.03368,0.04368,0.12368,0.09368,-0.22632,-0.02632,-0.00632,-0.09632,
          0.03368,-0.00632,0.00368,0.03368,-0.09632,-0.08632,-0.08632,-0.07632,-0.05632],
          'y': [0.074566,0.084576,0.124554,-0.065449,-0.105427,-0.065449,-0.055439,-0.075458,-0.085468,-0.035419,
          0.084576,0.024578,0.104534,0.104534,-0.045429,0.014568,0.034588,0.044537,0.014568,-0.035419],
          'z': [0.11136,0.21136,0.05136,-0.04864,-0.27864,0.04136,0.14136,0.13136,-0.05864,-0.13864,-0.03864,
          0.02136,-0.08864,0.25136,0.25136,0.04136,0.01136,0.02136,0.03136,0.02136]
        }
      });
    const fileInputRef = ref(null);
    const selectedFile = ref(null); //已选文件

    const GoToDash = () => {
        //跳转仪表盘页面
        router.push({ 
            name: 'layout', 
            params:{ 
                choice:'dashboard' 
            } 
        })
    }


    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        selectedFile.value = file;
        console.log(selectedFile.value);
    };
    const uploadFile =  () => {
        if (selectedFile.value) {
            let formData = new FormData();
            formData.append('csv', selectedFile.value);
            UploadCsv(formData)
            .then(function (result) {  
                console.log(result)
                // after_upload(result);
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        var myChart = echarts.init(document.getElementById('main'));
                let option;
                let yData=chartData.yData;
                let series = [];

                for (let name in yData) {
                series.push({
                    name: name,
                    type: 'line',
                    data: yData[name],
                    smooth: false,
                })
                }
                option = {
                    title: {
                        text: 'Curtain Vib'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['x', 'y', 'z']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    // toolbox: {
                    //     feature: {
                    //         saveAsImage: {}
                    //     }
                    // },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: series
                };
                myChart.setOption(option);
    };

</script>

<style>

    .upload-container{
        margin:30px;
    }

</style>