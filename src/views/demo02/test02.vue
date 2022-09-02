<template>
    <div class="">
        <div id="map" :style="{ height: '800px', width: '100%' }" ref="myEchart"></div>
    </div>
</template>
 
<script>
    import * as echarts from 'echarts';
    const chinaJson = require("@/utils/china.json") 
    export default {
        name: 'dp',
        data(){
            return{
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(data) {
                let myChart = echarts.init(document.getElementById('map'));
                echarts.registerMap('china', chinaJson);
                let option = {
                    title: {
                text: '全国疫情地图',
                subtext: '',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} (人)'
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
                }
            },
            visualMap: {
                min: 800,
                max: 50000,
                text: ['High', 'Low'],
                realtime: false,
                calculable: true,
                inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
                }
            },
            series: [
                {
                name: '全国现有确诊人数',
                type: 'map',
                map: 'china',
                label: {
                    show: true
                },
                data: [   
                    {
                    'name': '河南',
                    'value': 123
                    },
                    {
                    'name': '安徽',
                    'value': 143
                    },
                    {
                    'name': '上海',
                    'value': 44300
                    },
                    { name: '山东', value: 20057 },
                { name: '陕西', value: 15477},
                { name: '山西', value: 31686},
                { name: '河北', value: 6992 },
                { name: '江苏', value: 44045 },
                { name: '重庆', value: 40689 },
                { name: '四川', value: 37659 },
                { name: '辽宁', value: 45180.97 },
                { name: '江西', value: 55204.26 },
                { name: '广东', value: 21900.9 },
                { name: '浙江', value: 4918.26 },
                { name: '内蒙古', value: 5881.8},
                { name: '甘肃', value: 4178},
                { name: '广西', value: 2227},
                { name: '云南', value: 2180 },
                { name: '湖北', value: 9172 },
                { name: '湖南', value: 3368 },
                { name: '贵州', value: 806 }
                ],
            }
          ]
                };
                // option.title.text = data.title;
                // option.visualMap.max = data.max;
                // option.series[0].name = data.name;
                // option.series[0].data = data.data;
 
                myChart.setOption(option);
                window.addEventListener('resize', function () {
                    myChart.resize();
                });
            }
 
        }
    }
</script>