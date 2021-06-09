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
          value: "regionLocate",
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
              functionName: `functionName: " region
              Locate"`,
              params: `params: {
                xzqdm: "50011200000",
              //12位行政区代码,string,选填
                xzqmc: “渝北区” ,
              //行政区名称，string,选填
              // xzqdm,xzqmc参数二选一，必填
                level:”2”,
              //行政区级别，“string”，选填
              //可选值：”0”:省级、”1”:市州级、”2”:区县级”、
              “3”:街道级、”4”:村委级、”*”:所有级别
                display:2,
              //展示方式，number,选填
              //可选值：0:不显示，1显示，2显示后消失
              //默认值：1
              scale:130000,
              //比例尺，number,选填
              }`,
            },
            {
              type: "输出",
              functionName: `functionName: "Result"`,
              params: `params: {
              FunctionName:“regionLocate”,
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
          function sendMessage() {
            document.getElementById("map").contentWindow.postMessage(
              {
                  functionName: "regionLocate",
                  params: {
                    xzqmc:"巫溪",        //参数1 行政区名称             string （选填）：渝北区 
                    // xzqdm: "500112000000",  //参数2 12位行政区代码     string （选填） 500112000000     备注：  参数1和参数2二选一 必填
                    level:"2",           // 参数3 行政级别                string：(选填）"0"：省自治区直辖市、"1"：市州、"2"：区县、"3"：乡镇街道、"*"：在所有级别中查询   
                    display: 1,          //参数4 是否显示                 number （选填）0：不显示，1：显示，2显示后显示。  默认0 
                    // scale:1300000,       //参数5 比例尺                   number  （选填）: 130000   
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
      css: 
      ` 
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
                  functionName: "regionLocate",
                  params: {
                    xzqmc:"巫溪",        //参数1 行政区名称             string （选填）：渝北区 
                    // xzqdm: "500112000000",  //参数2 12位行政区代码     string （选填） 500112000000     备注：  参数1和参数2二选一 必填
                    level:"2",           // 参数3 行政级别                string：(选填）"0"：省自治区直辖市、"1"：市州、"2"：区县、"3"：乡镇街道、"*"：在所有级别中查询   
                    display: 1,          //参数4 是否显示                 number （选填）0：不显示，1：显示，2显示后显示。  默认0 
                    // scale:1300000,       //参数5 比例尺                   number  （选填）: 130000   
                  }
              },
              "*"
            );
        }

        function openMap() {
            $("#map").attr('src', 'http://10.88.0.9:8089/#/?userName=admin&pwd=cisdi123&sysToken=E2AA6C98-D9A9-47EB-97F0-DEADC374EDC0');//测试服务器cisdimap
            //$("#map").attr('src', 'http://172.30.41.156:8088/#/?userName=znjz&pwd=znjz123456&sysToken=9DB1C251-A3BA-4E56-BCDB-97A6B160C816'); //建委部署cisdimap         
            // $("#map").attr('src', 'http://127.0.0.1:8088/#/?userName=znjz&pwd=znjz123456&sysToken=9DB1C251-A3BA-4E56-BCDB-97A6B160C816');//本机cisdimap

        }
      `,
    };
  },
};
</script>

<style??? scoped>
</style???>