<template>
  <div>
    <codemirror
      :HTML="html"
      :CSS="css"
      :JAVASCRIPT="Javascript"
      :Data="data"
      :Example="example"
    ></codemirror>
  </div>
</template>

<script>
import codemirror from "../../components/codemirrorcomponent/index";

export default {
  components: {
    codemirror,
  },
  data() {
    return {
      data: [
        {
          lable: "方法名称:",
          value: "query",
          type: "topname",
        },
        {
          lable: "功能描述:",
          value: `根据查询条件查询指定图层的要素，并将查询结果返回给业务系统。
目前支持支根据几何点查询客户端渲染图层。
`,
          type: "topname",
        },
        {
          lable: "输入,输出:",
          columns: [
            {
              type: "输入",
              functionName: `functionName: "query”`,
              params: `params: {
                    mapId: "查询图层的mapId",
                    //要查询图层的mapId ,string, 必填
                    queryGeo：{//可以从地图双击事件获取地图点 
                    spatialReference: {  wkid: 4490  },
                    x: 125,
                    y:26.5 
                    }
                }`,
            },
            {
              type: "输出",
              functionName: `functionName: "Result"`,
              params: `params: {
                FunctionName:“query”,
                code: “执行状态”, @1
                msg: “执行信息”，
                resultData:”返回查询的要素”@2
                }`,
            },
          ],
          type: "table",
        },
        {
          lable: "备注:",
          value: `@1、执行状态200为成功、404为方法名错误、500为失败;
                @2、如果查询成功执行，resultData返回指定格式json数组，
                resultData :[//要素对象数组
                {   //要素对象
                attributes: {//要素属性
                GB:“500105000000”,//行政区代码
                CName:”江北区”,//行政区名称
                …
                },
                    geometry: “坐标系信息”
                }
                …
                ]。
                如果绘制未执行成功，返回的resultData为空字符串。
                `,
          type: "note",
        },
      ],

      example: [
        {
          lable: "示例1：调用接口示例",
          value: `
          document.getElementById("map").contentWindow.postMessage(
                {
               functionName: "query",
                 params: {
                    mapId: "zjqjt",
                    queryGeo: {
                        spatialReference: {
                            wkid: 102100
                        },
                        x: 11972783.254118372,
                        y: 3399885.13546273
                    }
                }
                },
                "*"
            )`,
        },
        {
            lable:"示例2：图层查询接口执行返回结果",
            value:`
             $(function() {
            window.addEventListener("message", function(event) {
                var data = event.data;  
                  
                switch (data.functionName) {  
                    case "Result"://判断地图事件 是返回地图接口执行结果
                         // 判断地图接口 
                         if (data.params.FunctionName == "query") {  
                        // 处理地图接口执行后的业务逻辑 比如调用图层控制接口
                        /* event.data = {
                            functionName: "Result",
                            params: {
                                FunctionName: "query"
                                code: "执行状态",
                                msg: "执行信息",
                                resultData: [
                                        { 
                                        attributes:{
                                            CNAME: "江北区"
                                            GB: "500105000000"
                                            ObjectID: 9  
                                            ys: 1
                                            zs: 11
                                            …
                                            }, 
                                        geometry:{
                                            rings: [Array(48)],
                                            spatialReference: {latestWkid: 3857, wkid: 102100}
                                        }, 
                                        ...    
                                ] 
                            }
                          }
                        */           
                        }
                        break;
            });
        }); `
        }
      ],

      html: `<div class="title">
        <h3 style="color:#ffffff;margin-left:20px;">测试业务系统</h3>
    </div>
    <div class="viewbody">
        <iframe class="map" id="map" src=""></iframe>
        <div class="menu">
            <button id="openMap">打开地图</button>
            <button id="open_psfq">打开排水图层</button>
            <button id="close_psfq">关闭排水图层</button>
            <button id="open_zjqjt_sj">打开住建全景图-设计渲染</button>
            <button id="open_zjqjt_zs">打开住建全景图-总数渲染</button>
            <button id="close_zjqjt">关闭住建全景图</button>
            <button id="query_zjqjt">查询住建全景图</button>
        </div>
    </div>`,
      css: `
      <style>
      .menu,
        .title,
        .map {
            border: 1px solid;
        }
        
        .viewbody{
          display:flex;
          flex-direction: column;
        }

        .menu {
            display: inline-block;
            left: 0px;
            width: 99%;
            height: 10vh;
        }
        
        .title {
            width: 99%;
            height: 50px;
            background-color: #0094ff;
        }
        
        .map {
            height: 80vh;
            width: 99%;
        }
        </style>
        `,
      Javascript: `
       $(function() {
            window.addEventListener("message", function(event) {
                var data = event.data;
                switch (data.functionName) { //地图加载事件
                    case "MapLoaded":
                        // 处理业务逻辑
                        /*  
                            event.data = {
                                functionName: "MapLoaded",
                                params: {
                                    FunctionName: "MapLoaded",
                                    code: "执行状态",
                                    msg: "执行信息",
                                    resultData: undefinde
                                }
                            }
                         */
                        sendMessage({
                            functionName: "setLayer",
                            params: {
                                mapId: "psfq",
                                oepn: 1,
                                opacity: 0.9,
                                zoomTo: 1
                            }
                        });
                        break;
                    case "MapDoubleClick": //地图双击事件
                        // 处理业务逻辑
                        /* 
                            event.data = {
                                functionName: "MapDoubleClick",
                                params: {
                                    FunctionName: "MapDoubleClick",
                                    code: "执行状态",
                                    msg: "执行信息",
                                    resultData: {
                                        mapPoint: {
                                            spatialReference: {
                                                wkid: 102100
                                            },
                                            x: 11864089.79989689,
                                            y: 3472423.875305339
                                        },
                                        screenPoint: {
                                            x: 355,
                                            y: 565
                                        }
                                    }
                                }
                            }
                         */
                        // console.log("MapDoubleClick", data)

                        sendMessage({
                            functionName: "query",
                            params: {
                                mapId: "ldxzq",
                                sublyrId: [0],
                                queryGeo: data.params.resultData.mapPoint
                            }
                        });
                        break;
                    case "MapPointerMove": //地图双击事件
                        // 处理业务逻辑
                        /*  
                        event.data = {
                            functionName: "MapPointerMove",
                            params: {
                                FunctionName: "MapPointerMove",
                                code: "执行状态",
                                msg: "执行信息",
                                resultData: {
                                    mapPoint: {
                                        spatialReference: {
                                            wkid: 102100
                                        },
                                        x: 11864089.79989689,
                                        y: 3472423.875305339
                                    },
                                    screenPoint: {
                                        x: 355,
                                        y: 565
                                    }
                                }
                            }
                        }
                         */
                        break;
                    case "Result": //接口执行结果 后续操作
                        // 处理业务逻辑
                        /*  
                        event.data = {
                            functionName: "Result",
                            params: {
                                FunctionName: "query"
                                code: "执行状态",
                                msg: "执行信息",
                                resultData: [
                                        { 
                                        attributes:{
                                            CNAME: "江北区"
                                            GB: "500105000000"
                                            ObjectID: 9
                                            gbcode: null
                                            sg: 4
                                            sj: 6
                                            ys: 1
                                            zs: 11
                                            }, 
                                        geometry:{
                                            rings: [Array(48)],
                                            spatialReference: {latestWkid: 3857, wkid: 102100}
                                        }, 
                                        ...    
                                ] 
                            }
                        }

                        event.data = {
                                    functionName: "Result",
                                    params: {
                                            FunctionName: "drawGeometry",
                                            code: 200,
                                            msg: "绘制成功！",
                                            resultData:{
                                            geometryCoord: "((96.61767578126481 96.61767578126481,101.10009765585491 101.10009765585491,96.5957031250609 96.5957031250609,96.61767578126481 96.61767578126481))",
                                            spatialReference: {wkid: 4490},
                                            type: "POLYGON",
                                            }
                                        
                                    }
                        }  
                        */
                        if (data.params.FunctionName == "drawGeometry") {
                            console.log(data.params.code, data.params.msg, data.params.resultData)
                        } else if (data.params.FunctionName == "query") {
                            console.log(data.params.code, data.params.msg, data.params.resultData);


                            // let resultData = data.params.resultData;
                            // let xzqmc = "";
                            // if (resultData[0]) {
                            //     if (resultData[0].attributes.GB == '500105000000') {
                            //         xzqmc = "江北区"
                            //     } else if (resultData[0].attributes.GB == '500112000000') {
                            //         xzqmc = "渝北区"
                            //     }
                            // }
                            // sendMessage({
                            //     functionName: "filterFeatures",
                            //     params: {
                            //         mapId: "psfq",
                            //         where: '主城区 like '$''{xzqmc}''
                            //     }
                            // });
                        }
                }


            });
        });

        function sendMessage({
            functionName = "",
            params = {}
        } = {}) {
            document.getElementById("map").contentWindow.postMessage({
                    functionName: functionName,
                    params: params
                },
                "*"
            );
        }

        document.getElementById("openMap").onclick = function() {
             $("#map").attr('src', 'http://10.88.0.9:8089/#/?userName=admin&pwd=cisdi123&sysToken=8E4B9116-F843-464B-9A4E-A4A80D5C06E6');//测试服务器cisdimap
            //$("#map").attr('src', 'http://172.30.41.156:8088/#/?userName=dsj&pwd=dsj123456&sysToken=783BD3AC-DFA9-44C0-9C1D-28F5EC566450'); //建委部署cisdimap   




            // $("#map").attr('src', 'http://127.0.0.1:8088/#/?userName=admin&pwd=cisdi123&sysToken=8D4B4888-4545-4F71-8B2D-21594EDF5714'); //本机cisdimap
        }
        document.getElementById("open_psfq").onclick = function() {
            //             mapId: "psfq", //地图服务ID，必填
            //             oepn: 0, //服务是否打开,0不打开,1打开,必填
            //             opacity: 1, //透明度，0~1之间的小数，非必填
            //             zoomTo: 1 //是否缩放到图层配置的初始位置,0不缩放,1缩放,非必填);    
            sendMessage({
                functionName: "setLayer",
                params: {
                    mapId: "psfq",
                    oepn: 1,
                    opacity: 0.5,
                    zoomTo: 1,
                    where: "主城区 like '%江北%'"
                }
            });
        }
        document.getElementById("close_psfq").onclick = function() {
            sendMessage({
                functionName: "setLayer",
                params: {
                    mapId: "psfq",
                    oepn: 0,
                    opacity: 1,
                    zoomTo: 1
                }
            });
        }
        document.getElementById("query_zjqjt").onclick = function() {
            sendMessage({
                functionName: "query",
                params: {
                    mapId: "zjqjt",
                    queryGeo: {
                        spatialReference: {
                            wkid: 102100
                        },
                        x: 11972783.254118372,
                        y: 3399885.13546273
                    }
                }
            });
        }

        document.getElementById("open_zjqjt_sj").onclick = function() {
            sendMessage({
                functionName: "setLayer",
                params: {
                    mapId: "zjqjt",
                    oepn: 1,
                    opacity: 0.6,
                    zoomTo: 1,
                    renderer: {
                        "type": "class-breaks",
                        "field": "sj",
                        "structType": "native-cfg",
                        "classBreakInfos": [{
                            "minValue": 0,
                            "maxValue": 2,
                            "symbol": {
                                "color": "rgb(255, 204, 102)",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }

                        }, {
                            "minValue": 2,
                            "maxValue": 4,
                            "symbol": {
                                "color": "rgb(102, 204, 255)",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }
                        }, {
                            "minValue": 4,
                            "maxValue": 6,
                            "symbol": {
                                "color": "rgb(51, 204, 51)",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }

                        }, {
                            "minValue": 6,
                            "maxValue": 8,
                            "symbol": {
                                "color": "rgb(250, 65, 74)",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }

                        }, {
                            "minValue": 8,
                            "maxValue": 10,
                            "symbol": {
                                "color": "rgb(102, 204, 255)",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }
                        }]
                    }
                }
            });
        }
        document.getElementById("open_zjqjt_zs").onclick = function() {
            sendMessage({
                functionName: "setLayer",
                params: {
                    mapId: "zjqjt",
                    oepn: 1,
                    opacity: 0.6,
                    zoomTo: 1,
                    renderer: {
                        "type": "class-breaks",
                        "field": "zs",
                        "structType": "native-cfg",
                        "classBreakInfos": [{
                            "minValue": 0,
                            "maxValue": 2,
                            "symbol": {
                                "color": "#28FCF1 ",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }
                        }, {
                            "minValue": 2,
                            "maxValue": 4,
                            "symbol": {
                                "color": "#22C9F4",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }
                        }, {
                            "minValue": 4,
                            "maxValue": 6,
                            "symbol": {
                                "color": "#1EA0F6",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }

                        }, {
                            "minValue": 6,
                            "maxValue": 8,
                            "symbol": {
                                "color": "#1979FB",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }

                        }, {

                            "minValue": 8,
                            "maxValue": 9,
                            "symbol": {
                                "color": "#1557FA",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }

                        }, {
                            "minValue": 9,
                            "maxValue": 10,
                            "symbol": {
                                "color": "#1341FB",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }

                        }, {
                            "minValue": 10,
                            "maxValue": 14,
                            "symbol": {
                                "color": "#0C06FE",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }

                        }]
                    }
                }
            });
        }


        document.getElementById("close_zjqjt").onclick = function() {
            sendMessage({
                functionName: "setLayer",
                params: {
                    mapId: "zjqjt",
                    oepn: 0,

                }
            });
        }
      `,
    };
  },
};
</script>

<style scoped>
</style>