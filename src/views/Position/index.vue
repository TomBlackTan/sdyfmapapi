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
          value: "getLocation",
          type: "topname",
        },
        {
          lable: "功能描述:",
          value: "调用GIS应用定位功能",
          type: "topname",
        },
        {
          lable: "输入,输出:",
          columns: [
            {
              type: "输入",
              functionName: `functionName: "getLocation"`,
              params: `params: {
                mapId: "psfq"(服务ID),
                idField:"FID"(关联字段名),
                FieldVal: "297"(关联字段值),
                sublyrId: [0](图层ID),
                FieldValType:”Number”(或者”String”,关联字段的类型),
                Openlyr:true(是否打开图层)
              }`,
            },
            {
              type: "输出",
              functionName: `functionName: "Result"`,
              params: `params: {
                FunctionName:“getLocation”,
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
          function setLocation() {
			 // document.getElementById("map")为加载GIS应用的iframe的DOM
            document.getElementById("map").contentWindow.postMessage(
              {
                  functionName: "getLocation",
                  params: {
                      // 方法所需的参数
                      // 必填
                      mapId: "psfq",// 服务ID
                      idField:"FID",// 关联字段名
                      FieldVal: "297",// 关联字段值
                      sublyrId: [0] // 图层ID
                      // 可选
                      scale:1000 // 比例尺
                  }
              },
              "*"
            );
        }`
        },
      ],

      html: `<div class="title">
        <h3 style="color:#ffffff;margin-left:20px;">测试业务系统</h3>
    </div>
    <div class="viewbody">
        <iframe class="map" id="map" src=""></iframe>
        <div class="menu">
            <button onclick="openMap()">打开地图</button>
            <button onclick="sendMessage()">定位</button>
        </div>
    </div>`,
      css: ` 
      <style>
      .menu,.title,.map{
            border:1px solid;
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
        .title{
            width:99%;
            height:50px;
            background-color:#0094ff;
        }
        .map{
            height:80vh;
            width:99%;
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
                        sendMessage();
                        // alert("map传来信息，完成加载了");
                        break;
                }
            });
        });

        function sendMessage() {
            document.getElementById("map").contentWindow.postMessage(
              {
                  functionName: "getLocation",
                  params: {
                      mapId: "psfq",
                      idField:"FID",
                      fieldVal: "297",
                      fieldValType:"Number",//字段类型"Number"|"String"
                      sublyrId: [0],
                      openlyr:true,//是否同时打开地图中的图层 true：打开； false：不操作
                      scale:40000
                  }
              },
              "*"
            );
        }

        function openMap() {
            $("#map").attr('src', 'http://10.88.0.9:8089/#/?userName=admin&pwd=cisdi123&sysToken=8E4B9116-F843-464B-9A4E-A4A80D5C06E6');//测试服务器cisdimap
            // $("#map").attr('src', 'http://172.30.41.156:8088/#/?userName=admin&pwd=cisdi123&sysToken=E2AA6C98-D9A9-47EB-97F0-DEADC374EDC0'); //建委部署cisdimap         
            // $("#map").attr('src', 'http://127.0.0.1:8088/#/?userName=admin&pwd=cisdi123&sysToken=E2AA6C98-D9A9-47EB-97F0-DEADC374EDC0');//本机cisdimap

        }
      `,
    };
  },
};
</script>

<style scoped>
</style>