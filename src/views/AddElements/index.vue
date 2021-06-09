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
					value: "addGraphic",
					type: "topname",
				},
				{
					lable: "功能描述:",
					value: "调用GIS应用添加临时元素功能",
					type: "topname",
				},
				{
					lable: "输入,输出:",
					columns: [
						{
							type: "输入",
							functionName: `functionName: "addGraphic"`,
							params: `params: {
                    geojson: {
                        "type":"Feature", 
                        "properties":{}, 
                        "geometry":{ 
                        "type":"Point", 
                        "coordinates":[106.5431,29.6579] 
                        } 
                    }, 
                    /*含义：图形描述,
                    类型：geoJson格式,字符串
                    是否必填：必填，
                    暂不支持GeometryCollection类型的几何对象。
                    */
                style:{
                    pointSymbol: { 
                        type: 'simple-marker', 
                        style: 'square', 
                        color: 'rgba(173, 255, 47,0.4)', 
                        size: '12px', 
                        outline: { 
                                color: 'rgba(173, 255, 47,1)', 
                                width: 3, 
                        },   
                    }, 
                    polylineSymbol: { 
                        type: 'simple-line',  
                        color: 'rgba(173, 255, 47,1)', 
                        width: '2px', 
                    }, 
                    polygonSymbol: { 
                        type: "simple-fill", 
                        style: "solid", 
                        color: "rgba(138,243,226,0.6)", 
                        outline: { 
                        color: "rgba(173, 255, 47,1)", 
                        width: 4 
                        } 
                    }
                } ,
                    /*含义：图形样式,
                    类型：esri点线面样式json
                    是否必填：选填
                    */ `,
						},
						{
							type: "输出",
							functionName: `functionName: "Result"`,
							params: `params: {
                                    FunctionName:“addGraphic”,
                                    code: “执行状态”,
                                    msg: “执行信息”
                                     }`,
						},
					],
					type: "table",
				},
				{
					lable: "备注:",
					value: "执行状态200为成功、404为方法名错误、500为失败;",
					type: "note",
				},
			],

			example: [
				{
					lable: "示例:",
					value: `
          function sendMessage() {
            document.getElementById("map").contentWindow.postMessage(
                {
                    functionName: " addGraphic",
                    params: {
                        geometry: {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [106.5431,29.6579]
                            }
                        } //图形描述,geoJson格式,必填       
                    }
                },
                "*"
            );
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
            <button id="open_gdjt">打开轨道交通图层</button>
            <button id="close_gdjt">关闭轨道交通图层</button>
            <button id="addGraphicCQ">添加要素_面集合_2d面要素</button>
            <button id="addGraphicFC">添加要素集_各种几何类型集合_自定义样式</button>
            <button id="addGraphic3dPoint">添加要素_点_3d样式</button>
            <button id="removeAllGraphics">删除所有要素</button>

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
       $(function () {
            window.addEventListener("message", function (event) {
                var data = event.data;
                switch (data.functionName) {
                    case "MapLoaded":
                        // 处理业务逻辑
                        sendMessage({ functionName: "setLayer", params: { mapId: "psfq", oepn: 1, opacity: 1, zoomTo: 1 } });
                        // alert("map传来信息，完成加载了");
                        break;
                }
            });
        });

        function sendMessage({ functionName = "", params = {} } = {}) {
            document.getElementById("map").contentWindow.postMessage(
                {
                    functionName: functionName,
                    params: params
                },
                "*"
            );
        };

        document.getElementById("openMap").onclick = function () {
            $("#map").attr('src', 'http://10.88.0.9:8089/#/?userName=admin&pwd=cisdi123&sysToken=E2AA6C98-D9A9-47EB-97F0-DEADC374EDC0');//测试服务器cisdimap
            // $("#map").attr('src', 'http://172.30.41.156:8088/#/?userName=admin&pwd=cisdi123&sysToken=E2AA6C98-D9A9-47EB-97F0-DEADC374EDC0'); //建委部署cisdimap         
            // $("#map").attr('src', 'http://127.0.0.1:8088/#/?userName=admin&pwd=cisdi123&sysToken=E2AA6C98-D9A9-47EB-97F0-DEADC374EDC0');//本机cisdimap

        }
        document.getElementById("addGraphicCQ").onclick = function () {
            /**
            * geojson: geojson ,支持类型：
            *               Point, MultiPoint , LineString, MultiLineString ,Polygon , MultiPolygon
            *               feature,featureCollection
            *                不支持含：geometryCollection 的元素。
            * 
            * style:见agsjsapi symbol 
            * */
            sendMessage({ functionName: "addGraphic", params: { geojson: cqgeoJson } });
        }
        document.getElementById("addGraphicFC").onclick = function () {
            sendMessage({
                functionName: "addGraphic", 
                params: {
                    geojson: feaCollection,
                    style: {
                        pointSymbol: {
                            type: 'simple-marker',
                            style: 'square',
                            color: 'rgba(173, 255, 47,0.4)',
                            size: '12px',
                            outline: {
                                color: 'rgba(173, 255, 47,1)',
                                width: 3,
                            },
                        },
                        polylineSymbol: {
                            type: 'simple-line',
                            color: 'rgba(173, 255, 47,1)',
                            width: '2px',
                        },
                        polygonSymbol: {
                            type: "simple-fill",
                            style: "solid",
                            color: "rgba(138,243,226,0.6)",
                            outline: {
                                color: "rgba(173, 255, 47,1)",
                                width: 4
                            }
                        }
                    },
                    zoomTo: 0//默认0 不缩放到图形
                }
            });
        }
        /*导入三维样式的要素，仅在三维长场景下有效  */
        document.getElementById("addGraphic3dPoint").onclick = function () {
            sendMessage({
                functionName: "addGraphic",
                params: {
                    geojson: geojsonPoint,
                    style: {
                        pointSymbol: {//3d点样式
                            type: "point-3d", // autocasts as new PointSymbol3D()
                            symbolLayers: [
                                {
                                    type: "object", // autocasts as new ObjectSymbol3DLayer()
                                    width: 70000,
                                    height: 100000,
                                    resource: {
                                        primitive: "cylinder"
                                    },
                                    material: {
                                        color: "#FFD700"
                                    }
                                }
                            ]
                        }
                    },
                    zoomTo: 1//1 缩放至图形
                }
            });
        }
        document.getElementById("removeAllGraphics").onclick = function () {
            sendMessage({ functionName: "removeAllGraphics", params: {} });
        }


        document.getElementById("open_gdjt").onclick = function () {
            /**
             * mapId: "psfq", //地图服务ID，必填
             * oepn: 0, //服务是否打开,0不打开,1打开,必填
             * opacity: 1, //透明度，0~1之间的小数，非必填
             * zoomTo: 1 //是否缩放到图层配置的初始位置,0不缩放,1缩放,非必填);  
             * */
            sendMessage({ functionName: "setLayer", params: { mapId: "gdjt", oepn: 1, opacity: 1, zoomTo: 1 } });
        }
        document.getElementById("close_gdjt").onclick = function () {
            sendMessage({ functionName: "setLayer", params: { mapId: "gdjt", oepn: 0, opacity: 1, zoomTo: 1 } });
        }

        window.feaCollection = {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [102.0, 0.5]
                    },
                    "properties": {
                        "prop0": "value0"
                    }
                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [102.0, 0.0],
                            [103.0, 1.0],
                            [104.0, 0.0],
                            [105.0, 1.0]
                        ]
                    },
                    "properties": {
                        "prop0": "value0",
                        "prop1": 0.0
                    }
                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [100.0, 0.0],
                                [101.0, 0.0],
                                [101.0, 1.0],
                                [100.0, 1.0],
                                [100.0, 0.0]
                            ]
                        ]
                    },
                    "properties": {
                        "prop0": "value0",
                        "prop1": {
                            "this": "that"
                        }
                    }
                }
                ]
            }

// window.feaCollection = {
        window.feaCollection_geocnest = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [102.0, 0.5]
            },
            "properties": {
                "prop0": "value0"
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [102.0, 0.0],
                    [103.0, 1.0],
                    [104.0, 0.0],
                    [105.0, 1.0]
                ]
            },
            "properties": {
                "prop0": "value0",
                "prop1": 0.0
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [100.0, 0.0],
                        [101.0, 0.0],
                        [101.0, 1.0],
                        [100.0, 1.0],
                        [100.0, 0.0]
                    ]
                ]
            },
            "properties": {
                "prop0": "value0",
                "prop1": {
                    "this": "that"
                }
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "GeometryCollection",
                "geometries": [{
                    "type": "Point",
                    "coordinates": [100.0, 0.0]
                }, {
                    "type": "LineString",
                    "coordinates": [
                        [101.0, 0.0],
                        [102.0, 1.0]
                    ]
                },
                ]
            }, "properties": {
                "prop0": "GeometryCollection",
                "prop1": {
                    "this": "that"
                }
            }
        }
        ]
    }

 window.cqgeoJson={
    "type": "FeatureCollection",
    "name": "重庆市",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "lat": 28.8496,
                "lng": 106.719,
                "CNAME": "綦江区",
                "ASCRIPTION": "",
                "GB": "500110"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            106.88787,
                            29.13486
                        ],
                        [
                            106.95057,
                            29.06236
                        ],
                        [
                            107.00947,
                            28.97256
                        ],
                        [
                            107.01177,
                            28.95516
                        ],
                        [
                            107.02487,
                            28.94426
                        ],
                        [
                            107.03887,
                            28.94876
                        ],
                    ]
                ]
            }
        }, 
       
        {
            "type": "Feature",
            "properties": {
                "lat": 28.8847,
                "lng": 108.804,
                "CNAME": "酉阳土家族苗族自治县",
                "ASCRIPTION": "",
                "GB": "500242"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            109.23087,
                            28.88346
                        ],
                        [
                            109.20937,
                            28.88376
                        ],
                        [
                            109.17127,
                            28.85456
                        ],
                        [
                            109.14317,
                            28.84856
                        ],
                        [
                            109.12617,
                            28.83546
                        ],
                        [
                            109.23087,
                            28.88346
                        ]
                    ]
                ]
            }
        } 
    ]
    }

    window.geojsonPoint = {
	"type": "Feature",
	"geometry": {
		"type": "Point",
		"coordinates": [102.0, 0.5]
	},
	"properties": {
		"prop0": "value0"
	}
}
      `,
		};
	},
};
</script>

<style scoped>
</style>