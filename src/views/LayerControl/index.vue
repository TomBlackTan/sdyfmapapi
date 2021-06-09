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
          value: "setLayer",
          type: "topname",
        },
        {
          lable: "功能描述:",
          value:
            "打开或关闭GIS应用中指定图层，设置指定图层要素过滤条件，设置指定图层的透明度，设置客户端渲染图层的渲染样式，设置客户端渲染图层的数据源",
          type: "topname",
        },
        {
          lable: "输入,输出:",
          columns: [
            {
              type: "输入",
              functionName: `functionName: " setLayer"`,
              params: `params: {
                mapId: "jscxqxx", //地图服务ID，必填
                oepn: 1, //服务是否打开,0不打开,1打开,必填
                opacity: 1, //透明度，0~1之间的小数，非必填
                zoomTo: 1 //是否缩放到图层配置的初始位置,0不缩放,
                1缩放,非必填);
                where: XXX=XXX, //过滤条件,选填，@1
                dataExtend:[@2]//客户端渲染图层渲染数据源
                dataSpatial:{adcode:”500000000010”},@3//当前dataExtend
                对应的行政区编码信息， 
                renderer:{@4},// 客户端渲染图层的渲染器json对象， 
                }`,
            },
            {
              type: "输出",
              functionName: `functionName: "Result"`,
              params: `params: {
                FunctionName:“setLayer”,
                code: “执行状态”, @5
                msg: “执行信息”
                }`,
            },
          ],
          type: "table",
        },
        {
          lable: "备注:",
          value: `@1、where参数只对动态图层和要素图层生效。
@2：dataExtend:渲染数据源
dataExtend参数目前只对客户端渲染图层生效，用于重新设置客户端渲染图层的渲染数据源，dataExtend参数必须包含data属性和aliases属性。
data以json数组的形式指定渲染数据源。data中需要渲染的字段的值必须是javascript的Number类型，alises中字段定义为“double”。data中必须包含行政区字段用以关联图形，行政区字段格式为js字符串类型，长度为12位，行政区编码规则参见国家统计局统计用区划代码2019。
aliases以json数组的形式定义渲染数据源的每个字段的字段信息。
指定每个字段的字段名（name,即data中的真名），
字段别名（alias悬浮弹框中展示的别名），
是否是行政区关联字段（kind:”regionUnionField”,有且仅有有一个，指定行政区代码字段为关联字段），
是否是渲染字段（kind:” renderField”,有且仅有一个，只能是double类型），
是否在弹框中展示（display=“0”不展示，“1”展示）,
字段的字段类型（type:”string”|”double”|…）
`,
          type: "note",
        },
      ],

      example: [
        {
          lable: "示例1：打开并缩放到排水分区图层",
          value: `
          function sendMessage() {
            document.getElementById("map").contentWindow.postMessage(
                {
                    functionName: "setLayer",
                    params: {
                        mapId: "psfq", //地图服务ID，必填
                        oepn: 1, //服务是否打开,0不打开,1打开,必填
                        opacity: 1, //透明度，0~1之间的小数，非必填
                        zoomTo: 1 //是否缩放到图层配置的初始位置,0不缩放,1缩放,非必填);
                    }
                },
                "*"
            );
        }`,
        },
        {
          lable: "示例2：重新设置驾驶舱详情信息的渲染数据和渲染样式",
          value: `
            document.getElementById("open_jscxqxx_wf").onclick = function() {
            sendMessage({
                functionName: "setLayer",
                params: {
                    mapId: "jscxqxx",
                    oepn: 1,
                    opacity: 0.6,
                    zoomTo: 1,
                    renderer: {
                        "type": "class-breaks",
                        "field": "wf",  
                        "structType": "native-cfg",
                        "classBreakInfos": [{
                            "minValue": 0,
                            "maxValue": 20,
                            "symbol": {
                                "color": "rgb(255, 204, 102)",
                                 "outline": { "color": "#478FFA"}                             
                            }
                        }, {
                            "minValue": 20,
                            "maxValue": 30,
                            "symbol": {
                                "color": "rgb(102, 204, 255)",
                               "outline": { "color": "#478FFA"}                                                                         
                            }
                        }, {
                            "minValue": 30,
                            "maxValue": 60,
                            "symbol": {
                                "color": "rgb(51, 204, 51)",
                                 "outline": { "color": "#478FFA"}                                                           }
                        }, {
                            "minValue": 60,
                            "maxValue": 80,
                            "symbol": {
                                "color": "rgb(250, 65, 74)",
                                  "outline": { "color": "#478FFA"}                            }
                        }, {
                            "minValue": 80,
                            "maxValue": 100,
                            "symbol": {
                                "color": "rgb(102, 204, 255)",
                                "outline": { "color": "#478FFA"}
                            }
                        }],
                    },
                    dataExtend: {
                        data: [{
                            "xm": 18,
                            "qy": 0,
                            "xmanjs": 0,
                            "wf": 3,
                            "xmtzbh": 0,
                            "czjc": 10,
                            "xzqhmc": "渝东北",
                            "xzqhdm": "500000000013"
                        }, {
                            "xm": 6,
                            "qy": 0,
                            "xmanjs": 0,
                            "wf": 30,
                            "xmtzbh": 0,
                            "czjc": 15,
                            "xzqhmc": "渝东南",
                            "xzqhdm": "500000000014"
                        }, {
                            "xm": 13,
                            "qy": 0,
                            "xmanjs": 4,
                            "wf": 49,
                            "xmtzbh": 0,
                            "czjc": 20,
                            "xzqhmc": "渝西",
                            "xzqhdm": "500000000012"
                        }, {
                            "xm": 88,
                            "qy": 3,
                            "xmanjs": 2,
                            "wf": 80,
                            "xmtzbh": 3,
                            "czjc": 30,
                            "xzqhmc": "主城",
                            "xzqhdm": "500000000011"
                        }],
                        aliases: [{
                            "name": "xzqhdm",
                            "alias": "行政区划代码",
                            "kind": "regionUnionField",
                            "type": "double",
                            "from": "dataExtent",
                            "display": "0"
                        }, {
                            "name": "czjc",
                            "alias": "村镇基础设施",
                            "kind": "renderField",
                            "type": "double",
                            "from": "dataExtent",
                            "display": "1"
                        }, {
                            "name": "wf",
                            "alias": "城镇危房变化",
                            "kind": "",
                            "type": "double",
                            "from": "dataExtent",
                            "display": "1"
                        }, ]
                    },
                    dataSpatial: {
                        adcode: "500000000010"
                    }
                }
            });
        }`,
        },
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
            <button id="open_gdjt">打开轨道交通图层</button>
            <button id="close_gdjt">关闭轨道交通图层</button>
            <button id="open_zjqjt_sj">打开住建全景图-渲染设计-renderer</button>
            <button id="open_zjqjt_zs">打开住建全景图-渲染总数-renderer</button>
            <button id="open_zjqjt_to_zjqjt_zs_ext">打开住建全景图-渲染住建全景图-总数-ext</button>
            <button id="open_zjqjt_to_sjjcjsc_czjc_ext">打开住建全景图-渲染数据决策驾驶舱-村镇基础设施-ext</button>
            <button id="open_jscxqxx_to_sjjcjsc_wf_ext">打开驾驶舱详情信息-渲染数据决策驾驶舱-渲染城镇危房变化-ext</button>
            <button id="close_zjqjt">关闭住建全景图</button>
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
                switch (data.functionName) {
                    case "MapLoaded":
                        // 处理业务逻辑
                        sendMessage({
                            functionName: "setLayer",
                            params: {
                                mapId: "psfq",
                                oepn: 1,
                                opacity: 0.9,
                                zoomTo: 1
                            }
                        });
                        // alert("map传来信息，完成加载了");
                        break;
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
            //$("#map").attr('src', 'http://172.30.41.156:8088/#/?userName=admin&pwd=cisdi123&sysToken=8D4B4888-4545-4F71-8B2D-21594EDF5714'); //建委部署cisdimap         
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
        document.getElementById("open_gdjt").onclick = function() {
            sendMessage({
                functionName: "setLayer",
                params: {
                    mapId: "gdjt",
                    oepn: 1,
                    opacity: 1,
                    zoomTo: 1
                }
            });
        }
        document.getElementById("close_gdjt").onclick = function() {
            sendMessage({
                functionName: "setLayer",
                params: {
                    mapId: "gdjt",
                    oepn: 0,
                    opacity: 1,
                    zoomTo: 1
                }
            });
        }

        /* 只传renderer 在图层原有数据基础上，控制样式 */
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
                    },
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
                                "color": "#28FCF1",
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


        /* 同时传dataExtend和renderer 同时控制图层数据和样式 */
        document.getElementById("open_zjqjt_to_zjqjt_zs_ext").onclick = function() {
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
                                "color": "#28FCF1",
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
                    },

                    dataExtend: {
                        data: [{
                            "sj": 0,
                            "sg": 3,
                            "ys": 4,
                            "zs": 7,
                            "xzqhmc": "巴南区",
                            "xzqhdm": "500113000000"
                        }, {
                            "sj": 1,
                            "sg": 4,
                            "ys": 4,
                            "zs": 9,
                            "xzqhmc": "北碚区",
                            "xzqhdm": "500109000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "璧山区",
                            "xzqhdm": "500120000000"
                        }, {
                            "sj": 0,
                            "sg": 0,
                            "ys": 1,
                            "zs": 1,
                            "xzqhmc": "长寿区",
                            "xzqhdm": "500115000000"
                        }, {
                            "sj": 0,
                            "sg": 0,
                            "ys": 1,
                            "zs": 1,
                            "xzqhmc": "城口县",
                            "xzqhdm": "500229000000"
                        }, {
                            "sj": 1,
                            "sg": 3,
                            "ys": 5,
                            "zs": 9,
                            "xzqhmc": "大渡口区",
                            "xzqhdm": "500104000000"
                        }, {
                            "sj": 0,
                            "sg": 1,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "大足区",
                            "xzqhdm": "500111000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "垫江县",
                            "xzqhdm": "500231000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "丰都县",
                            "xzqhdm": "500230000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "奉节县",
                            "xzqhdm": "500236000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "涪陵区",
                            "xzqhdm": "500102000000"
                        }, {
                            "sj": 0,
                            "sg": 0,
                            "ys": 1,
                            "zs": 1,
                            "xzqhmc": "合川区",
                            "xzqhdm": "500117000000"
                        }, {
                            "sj": 1,
                            "sg": 4,
                            "ys": 6,
                            "zs": 11,
                            "xzqhmc": "江北区",
                            "xzqhdm": "500105000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "江津区",
                            "xzqhdm": "500116000000"
                        }, {
                            "sj": 2,
                            "sg": 3,
                            "ys": 5,
                            "zs": 10,
                            "xzqhmc": "九龙坡区",
                            "xzqhdm": "500107000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "开州区",
                            "xzqhdm": "500154000000"
                        }, {
                            "sj": 0,
                            "sg": 0,
                            "ys": 1,
                            "zs": 1,
                            "xzqhmc": "梁平区",
                            "xzqhdm": "500155000000"
                        }, {
                            "sj": 0,
                            "sg": 0,
                            "ys": 1,
                            "zs": 1,
                            "xzqhmc": "两江新区",
                            "xzqhdm": null
                        }, {
                            "sj": 1,
                            "sg": 4,
                            "ys": 5,
                            "zs": 10,
                            "xzqhmc": "南岸区",
                            "xzqhdm": "500108000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "南川区",
                            "xzqhdm": "500119000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 1,
                            "zs": 2,
                            "xzqhmc": "彭水县",
                            "xzqhdm": null
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "黔江区",
                            "xzqhdm": "500114000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "荣昌区",
                            "xzqhdm": "500153000000"
                        }, {
                            "sj": 1,
                            "sg": 4,
                            "ys": 4,
                            "zs": 9,
                            "xzqhmc": "沙坪坝区",
                            "xzqhdm": "500106000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "石柱土家族自治县",
                            "xzqhdm": "500240000000"
                        }, {
                            "sj": 0,
                            "sg": 1,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "铜梁区",
                            "xzqhdm": "500151000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 1,
                            "zs": 2,
                            "xzqhmc": "潼南区",
                            "xzqhdm": "500152000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "万盛经开区",
                            "xzqhdm": null
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 2,
                            "zs": 3,
                            "xzqhmc": "万州区",
                            "xzqhdm": "500101000000"
                        }, {
                            "sj": 0,
                            "sg": 1,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "巫山县",
                            "xzqhdm": "500237000000"
                        }, {
                            "sj": 2,
                            "sg": 1,
                            "ys": 3,
                            "zs": 6,
                            "xzqhmc": "巫溪县",
                            "xzqhdm": "500238000000"
                        }, {
                            "sj": 0,
                            "sg": 1,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "武隆区",
                            "xzqhdm": "500156000000"
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "秀山县",
                            "xzqhdm": null
                        }, {
                            "sj": 1,
                            "sg": 0,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "永川区",
                            "xzqhdm": "500118000000"
                        }, {
                            "sj": 0,
                            "sg": 1,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "酉阳县",
                            "xzqhdm": null
                        }, {
                            "sj": 1,
                            "sg": 5,
                            "ys": 6,
                            "zs": 12,
                            "xzqhmc": "渝北区",
                            "xzqhdm": "500112000000"
                        }, {
                            "sj": 0,
                            "sg": 1,
                            "ys": 9,
                            "zs": 10,
                            "xzqhmc": "渝中区",
                            "xzqhdm": "500103000000"
                        }, {
                            "sj": 0,
                            "sg": 1,
                            "ys": 0,
                            "zs": 1,
                            "xzqhmc": "云阳县",
                            "xzqhdm": "500235000000"
                        }, {
                            "sj": 0,
                            "sg": 0,
                            "ys": 1,
                            "zs": 1,
                            "xzqhmc": "忠县",
                            "xzqhdm": "500233000000"
                        }],
                        aliases: [{
                                "name": "xzqhdm",
                                "alias": "区划代码",
                                "kind": "regionUnionField",
                                "type": "string",
                                "from": "dataExtent",
                                "display": "0"
                            }, {
                                "name": "zs",
                                "alias": "项目总数",
                                "kind": "renderField",
                                "type": "double",
                                "from": "dataExtent",
                                "display": "1"
                            }, {
                                "name": "sj",
                                "alias": "设计数目",
                                "kind": "displayField",
                                "type": "double",
                                "from": "dataExtent",
                                "display": "1" //
                            }, {
                                "name": "sg",
                                "alias": "施工数目",
                                "kind": "displayField",
                                "type": "double",
                                "from": "dataExtent",
                                "display": "1"
                            }, {
                                "name": "ys",
                                "alias": "验收数目",
                                "kind": "displayField",
                                "type": "double",
                                "from": "dataExtent",
                                "display": "1"
                            }


                        ]
                    },
                    dataSpatial: {
                        adcode: "500000000000"
                    }
                }
            });
        }

        document.getElementById("open_zjqjt_to_sjjcjsc_czjc_ext").onclick = function() {
            sendMessage({
                functionName: "setLayer",
                params: {
                    mapId: "zjqjt",
                    oepn: 1,
                    opacity: 0.6,
                    zoomTo: 1,
                    renderer: {
                        "type": "class-breaks",
                        "field": "czjc", //如果这里配置字段了从这里取字段，如果没有设置字段，从aliases中取字段
                        "structType": "native-cfg",
                        "classBreakInfos": [{
                                "minValue": 0,
                                "maxValue": 10,
                                "symbol": {
                                    "color": "#28FCF1", //#161616 格式 
                                    "outline": {
                                        "color": "#478FFA" // [255, 235, 59, 0.77] // 
                                    }
                                },
                                //   label: "< 35%"
                            }, {
                                minValue: 10,
                                maxValue: 15,
                                symbol: {
                                    color: "#22C9F4",
                                    outline: {
                                        color: "#478FFA"
                                    }
                                }
                            }, {
                                minValue: 15,
                                maxValue: 20,
                                symbol: {
                                    color: "#1EA0F6",
                                    outline: {
                                        color: "#478FFA"
                                    }
                                }

                            },
                            // {
                            //     minValue: 60,
                            //     maxValue: 80,
                            //     symbol: {
                            //         color: "#1979FB",
                            //         outline: {
                            //             color: "#478FFA"
                            //         }
                            //     }

                            // },
                            // {

                            //     minValue: 50,
                            //     maxValue: 75,
                            //     symbol: {
                            //         color: "#1557FA",
                            //         outline: {
                            //             color: "#478FFA"
                            //         }
                            //     }

                            // },
                            // {
                            //     minValue: 9,
                            //     maxValue: 10,
                            //     symbol: {
                            //         color: "#1341FB",
                            //         outline: {
                            //             color: "#478FFA"
                            //         }
                            //     }

                            // },
                            {
                                minValue: 20,
                                maxValue: 100, // Infinity,sessionStorage中无穷数无效，变为null
                                symbol: {
                                    color: "#0C06FE",
                                    outline: {
                                        color: "#478FFA"
                                    }
                                }

                            }
                        ],
                    },
                    dataExtend: {
                        data: [{
                            "xm": 18,
                            "qy": 0,
                            "xmanjs": 0,
                            "wf": 3,
                            "xmtzbh": 0,
                            "czjc": 10,
                            "xzqhmc": "渝东北",
                            "xzqhdm": "500000000013"
                        }, {
                            "xm": 6,
                            "qy": 0,
                            "xmanjs": 0,
                            "wf": 0,
                            "xmtzbh": 0,
                            "czjc": 15,
                            "xzqhmc": "渝东南",
                            "xzqhdm": "500000000014"
                        }, {
                            "xm": 13,
                            "qy": 0,
                            "xmanjs": 4,
                            "wf": 0,
                            "xmtzbh": 0,
                            "czjc": 20,
                            "xzqhmc": "渝西",
                            "xzqhdm": "500000000012"
                        }, {
                            "xm": 88,
                            "qy": 3,
                            "xmanjs": 2,
                            "wf": 0,
                            "xmtzbh": 3,
                            "czjc": 30,
                            "xzqhmc": "主城",
                            "xzqhdm": "500000000011"
                        }],
                        aliases: [{
                            "name": "xzqhdm",
                            "alias": "行政区划代码",
                            "kind": "regionUnionField",
                            "type": "double",
                            "from": "dataExtent",
                            "display": "0"
                        }, {
                            "name": "czjc",
                            "alias": "村镇基础设施",
                            "kind": "renderField",
                            "type": "double",
                            "from": "dataExtent",
                            "display": "1"
                        }, {
                            "name": "wf",
                            "alias": "城镇危房变化",
                            "kind": "displayField",
                            "type": "double",
                            "from": "dataExtent",
                            "display": "1"
                        }, ]

                    },
                    dataSpatial: {
                        adcode: "500000000010"
                    }
                }
            });
        }

        document.getElementById("open_jscxqxx_to_sjjcjsc_wf_ext").onclick = function() {
            sendMessage({
                functionName: "setLayer",
                params: {
                    mapId: "jscxqxx",
                    oepn: 1,
                    opacity: 0.6,
                    zoomTo: 1,
                    renderer: {
                        "type": "class-breaks",
                        "field": "wf", //如果这里配置字段了从这里取字段，如果没有设置字段，从aliases中取字段
                        "structType": "native-cfg",
                        "classBreakInfos": [{
                            "minValue": 0,
                            "maxValue": 20,
                            "symbol": {
                                "color": "rgb(255, 204, 102)",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }
                        }, {
                            "minValue": 20,
                            "maxValue": 30,
                            "symbol": {
                                "color": "rgb(102, 204, 255)",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }
                        }, {
                            "minValue": 30,
                            "maxValue": 60,
                            "symbol": {
                                "color": "rgb(51, 204, 51)",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }

                        }, {
                            "minValue": 60,
                            "maxValue": 80,
                            "symbol": {
                                "color": "rgb(250, 65, 74)",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }

                        }, {
                            "minValue": 80,
                            "maxValue": 100,
                            "symbol": {
                                "color": "rgb(102, 204, 255)",
                                "outline": {
                                    "color": "#478FFA"
                                }
                            }
                        }],
                    },
                    dataExtend: {
                        data: [{
                            "xm": 18,
                            "qy": 0,
                            "xmanjs": 0,
                            "wf": 3,
                            "xmtzbh": 0,
                            "czjc": 10,
                            "xzqhmc": "渝东北",
                            "xzqhdm": "500000000013"
                        }, {
                            "xm": 6,
                            "qy": 0,
                            "xmanjs": 0,
                            "wf": 30,
                            "xmtzbh": 0,
                            "czjc": 15,
                            "xzqhmc": "渝东南",
                            "xzqhdm": "500000000014"
                        }, {
                            "xm": 13,
                            "qy": 0,
                            "xmanjs": 4,
                            "wf": 49,
                            "xmtzbh": 0,
                            "czjc": 20,
                            "xzqhmc": "渝西",
                            "xzqhdm": "500000000012"
                        }, {
                            "xm": 88,
                            "qy": 3,
                            "xmanjs": 2,
                            "wf": 80,
                            "xmtzbh": 3,
                            "czjc": 30,
                            "xzqhmc": "主城",
                            "xzqhdm": "500000000011"
                        }],
                        aliases: [{
                            "name": "xzqhdm",
                            "alias": "行政区划代码",
                            "kind": "regionUnionField",
                            "type": "double",
                            "from": "dataExtent",
                            "display": "0"
                        }, {
                            "name": "czjc",
                            "alias": "村镇基础设施",
                            "kind": "renderField",
                            "type": "double",
                            "from": "dataExtent",
                            "display": "1"
                        }, {
                            "name": "wf",
                            "alias": "城镇危房变化",
                            "kind": "",
                            "type": "double",
                            "from": "dataExtent",
                            "display": "1"
                        }, ]
                    },
                    dataSpatial: {
                        adcode: "500000000010"
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