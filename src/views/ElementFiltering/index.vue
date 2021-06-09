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
          value: "filterFeatures",
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
              functionName: `functionName: " filterFeatures"`,
              params: `params: {
                mapId: "psfq", //地图服务ID，必填
                where: XXX=XXX, //过滤条件,必填
               }`,
            },
            {
              type: "输出",
              functionName: `functionName: "Result"`,
              params: `params: {
                FunctionName:“removeAllGraphics”,
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
          lable:"示例:",
          value:`
           * filterFeatures
             * @param {string} mapId：reqiured,图层节点mapId 
             * @param {string} where: 过滤条件 where子句 //注意单引号！
             *  */
            sendMessage({
                functionName: "filterFeatures",
                params: {
                    mapId: "psfq",
                    where: "主城区 like '%江北区%'"
                }
            });`
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
            <button id="filterFeatures_psfq1">筛选排水-江北区</button>
            <button id="filterFeatures_psfq2">筛选排水-全部</button>
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
                                opacity: 1,
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
            // $("#map").attr('src', 'http://172.30.41.156:8088/#/?userName=admin&pwd=cisdi123&sysToken=8D4B4888-4545-4F71-8B2D-21594EDF5714'); //建委部署cisdimap         
            //$("#map").attr('src', 'http://127.0.0.1:8088/#/?userName=admin&pwd=cisdi123&sysToken=8D4B4888-4545-4F71-8B2D-21594EDF5714'); //本机cisdimap
        }
        document.getElementById("open_psfq").onclick = function() {
            sendMessage({
                functionName: "setLayer",
                params: {
                    mapId: "psfq",
                    oepn: 1,
                    opacity: 0.5,
                    zoomTo: 1
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
        document.getElementById("filterFeatures_psfq1").onclick = function() {
            /**
             * filterFeatures
             * @param {string} mapId：reqiured,图层节点mapId 
             * @param {string} where: 过滤条件 where子句 //注意单引号！
             *  */
            sendMessage({
                functionName: "filterFeatures",
                params: {
                    mapId: "psfq",
                    where: "主城区 like '%江北区%'"
                }
            });
        }
        document.getElementById("filterFeatures_psfq2").onclick = function() {
            sendMessage({
                functionName: "filterFeatures",
                params: {
                    mapId: "psfq",
                    where: "1=1"
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