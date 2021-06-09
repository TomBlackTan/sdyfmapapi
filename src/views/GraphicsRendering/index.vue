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
          value: "drawGeometry",
          type: "topname",
        },
        {
          lable: "功能描述:",
          value: "筛选显示的图层要素",
          type: "topname",
        },
        {
          lable: "输入,输出:",
          columns: [
            {
              type: "输入",
              functionName: `functionName: "drawGeometry”`,
              params: `params: {
              type: "polygon",
              //要绘制的几何类型 ,string, 必填
              //可选值：”polygon”:绘制面、
              ”polyline”：绘制线、
              ”point”:绘制点”、 
              }`,
            },
            {
              type: "输出",
              functionName: `functionName: "Result"`,
              params: `params: {
                FunctionName:“drawGeometry”,
                code: “执行状态”,
                msg: “执行信息”，
                resultData:”返回绘制的坐标串”
              }`,
            },
          ],
          type: "table",
        },
        {
          lable: "备注:",
          value: `1、执行状态200为成功、404为方法名错误、500为失败;
2、如果绘制成功执行，resultData返回指定格式json对象，
{   type: ”返回几何类型”，
geometryCoord: ”绘制的坐标串”,
 spatialReference: “坐标系信息”
}。
3、如果绘制未执行成功，返回的resultData为空字符串。
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
                    functionName: "drawGeometry",
                    params: {
                        type: "polygon"// 可选值："polygon"|| "polyline" ||"point"
                    }
                },
                "*"
            );`,
        },
        {
            lable:"示例2：绘制面返回示例",
            value:`
             {
             functionName: "Result",
             params: {
                FunctionName: "drawGeometry",
                code: "200",
                msg: "绘制成功",
                resultData: {
                    type: "POLYGON",
                    geometryCoord: "((3894007.968955485 3894007.968955485,8022830.488806466 8022830.488806466,3894007.968955485 3894007.968955485))",
                    spatialReference: { wkid: 4490}
                }
              }
            }
            `
        },
        {
            lable:"示例3：绘制线返回结果",
            value:`
            {
             functionName: "Result",
             params: {
                FunctionName: "drawGeometry",
                code: "200",
                msg: "绘制成功",
                resultData: {
                type: "POLYLINE",
                geometryCoord: "(11374195.289855465 11374195.289855465,11309376.689869653 11309376.689869653)" ,
                spatialReference: { wkid: 4490}
                }
               }
            }`
        },
        {
            lable:"示例4：绘制点返回结果",
            value:`
                {
             functionName: "Result",
             params: {
                FunctionName: "drawGeometry",
                code: "200",
                msg: "绘制成功",
                resultData: {
                type: "POINT",
                geometryCoord: "(11226213.203095403 3633199.4694443042)",
                spatialReference: { wkid: 4490}
                }
              }
            }`
        }
      ],

      html: `<div class="title">
        <h3 style="color:#ffffff;margin-left:20px;">测试业务系统</h3>
    </div>
    <div class="viewbody">
        <iframe class="map" id="map" src=""></iframe>
        <div class="menu">
            <button onclick="openMap()">打开地图</button>
            <button onclick="sendMessage4drawpolygon('polygon')">绘制面</button>
            <button onclick="sendMessage4drawpolygon('polyline')">绘制线</button>
            <button onclick="sendMessage4drawpolygon('point')">绘制点</button>
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
                        sendMessage4drawpolygon("polygon");
                        // alert("map传来信息，完成加载了");
                        break;


                    case "Result":
                        // 处理业务逻辑
                        /*  
                       { 
                            functionName: "Result"
                            params: {
                                    FunctionName:"drawGeometry",
                                    code: “执行状态”,
                                    msg: “执行信息”
                                    resultData：""
                                    }  
                        } 
                        */
                        if (data.params.FunctionName == "drawGeometry") {
                            console.log(data.params.code, data.params.msg, data.params.resultData)
                        }

                        break;
                }

            });
        });

        function sendMessage4drawpolygon(type) {
            document.getElementById("map").contentWindow.postMessage({
                    functionName: "drawGeometry",
                    params: {
                        type: type // 可选值："polygon"|| "polyline" ||"point"
                    }
                },
                "*"
            );
        }

        function openMap() {
             $("#map").attr('src', 'http://10.88.0.9:8089/#/?userName=admin&pwd=cisdi123&sysToken=E2AA6C98-D9A9-47EB-97F0-DEADC374EDC0');//测试服务器cisdimap
            // $("#map").attr('src', 'http://172.30.41.156:8088/#/?userName=admin&pwd=cisdi123&sysToken=E2AA6C98-D9A9-47EB-97F0-DEADC374EDC0'); //建委部署cisdimap         
            //$("#map").attr('src', 'http://127.0.0.1:8088/#/?userName=admin&pwd=cisdi123&sysToken=E2AA6C98-D9A9-47EB-97F0-DEADC374EDC0'); //本机cisdimap

        }
      `,
    };
  },
};
</script>

<style scoped>
</style>