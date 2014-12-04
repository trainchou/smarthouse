var tem = new Array();
var hum = new Array();
var time = new Array();
// Step:3 conifg ECharts's path, link to echarts.js from current page.
// Step:3 为模块加载器配置echarts的路径，从当前页面链接到echarts.js，定义所需图表路径
require.config({
    paths: {
        echarts: '../js/echarts-map',
        'echarts/chart/bar': '../js/echarts-map',
        'echarts/chart/line': '../js/echarts-map',
        'echarts/chart/map': '../js/echarts-map'
    }
});

function getjson(jsondata) {
    for (var i = 0; i < jsondata.length; i++) {
        tem[i] = jsondata[i].temperature;
        hum[i] = jsondata[i].humidity;
        time[i] = jsondata[i].time;
    }


// Step:4 require echarts and use it in the callback.
// Step:4 动态加载echarts然后在回调函数中开始使用，注意保持按需加载结构定义图表路径
    require(
            [
                'echarts',
                'echarts/chart/bar',
                'echarts/chart/line',
                'echarts/chart/map'
            ],
            function(ec) {
                //--- 折柱 ---
                var myChart = ec.init(document.getElementById('main'));
                myChart.setOption({
                    title: {
                        text: '温湿度变化表',
//                    subtext: '纯属虚构'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    dataZoom: {
                        show: true,
                        realtime: true,
                        //orient: 'vertical',   // 'horizontal'
                        //x: 0,
                        y: 36,
                        //width: 400,
                        height: 20,
                        //backgroundColor: 'rgba(221,160,221,0.5)',
                        //dataBackgroundColor: 'rgba(138,43,226,0.5)',
                        //fillerColor: 'rgba(38,143,26,0.6)',
                        //handleColor: 'rgba(128,43,16,0.8)',
                        //xAxisIndex:[],
                        //yAxisIndex:[],
                        start: 80,
                        end: 100
                    },
                    legend: {
                        data: ['温度', '湿度']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: time
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitArea: {show: true}
                        }
                    ],
                    series: [
                        {
                            name: '温度',
                            type: 'line',
                            data: tem
                        },
                        {
                            name: '湿度',
                            type: 'line',
                            data: hum
                        }
                    ]
                });

                /* --- 地图 ---
                 var myChart2 = ec.init(document.getElementById('mainMap'));
                 
                 
                 // 自定义扩展图表类型：mapType = HK
                 require('mapData/params').params.HF = {
                 getGeoJson: function (callback) {
                 $.getJSON('json/hefeimap.json',callback);
                 }
                 }
                 
                 myChart2.setOption({
                 tooltip: {
                 trigger: 'item',
                 formatter: '{b}'
                 },
                 series: [
                 {
                 name: '安徽',
                 type: 'map',
                 mapType: 'HF',
                 selectedMode: 'multiple',
                 itemStyle: {
                 normal: {label: {show: true}},
                 emphasis: {label: {show: true}}
                 },
                 data: [
                 //                                {name: '合肥市', selected: true}
                 ]
                 }
                 ]
                 });*/
            }
    );
}