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
          value: "resetSize",
          type: "topname",
        },
        {
          lable: "功能描述:",
          value: "调用GIS应用设置弹窗大小功能",
          type: "topname",
        },
        {
          lable: "输入,输出:",
          columns: [
            {
              type: "输入",
              functionName: `functionName: "resetSize"`,
              params: `params: {
              width: 320(宽度),
              height:240(高度)
              }`,
            },
            {
              type: "输出",
              functionName: `functionName: "Result"`,
              params: `params: {
              FunctionName:“resetSize”,
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
          function setSize() {
            window.parent.postMessage(
            {
                functionName: "resetSize",
                params: {
                    width: 320,
                    height: 240
                }
            },
            "*"
            );
          }`
        },
      ],

      html: `<div class="testMessage">
        <table>
            <tr>
                <td><label>图形编码:</label></td>
                <td colspan="2"><span id="txbm"></span></td>
            </tr>
            <tr>
                <td><label>所在地区:</label></td>
                <td colspan="2"><span id="szd"></span></td>
            </tr>
            <tr>
                <td><label>负责单位:</label></td>
                <td colspan="2"><span id="fzdw"></span></td>
            </tr>
            <tr>
                <td><label>维护时间:</label></td>
                <td colspan="2"><span id="whsj"></span></td>
            </tr>
            <tr>
                <td><label>地区信息:</label></td>
                <td colspan="2"><span id="xx"></span></td>
            </tr>
        </table>
    </div>`,
      css: `
      <style>
      .testMessage table {
            margin: auto;
            table-layout: fixed;
            width: 100%;
            height: 100%;
            border-collapse: collapse;
        }

        table td {
            border: 1px solid;
            word-wrap: break-word;
            word-break: break-all;
        }
        </style>
        `,
      Javascript: `
       $(function () {
            window.addEventListener("message", function (event) {
                var data = event.data;
                // if (event.origin == "http://localhost:8088") {
                    console.log("---ywpage收到", data.functionName)
                    switch (data.functionName) {
                        case "getTXBM":
                            // 处理业务逻辑
                            let txbms = data.params.FID.split('-');
                            if (txbms.length > 1) {
                                // 处理多个图形选中多个图形编码
                            } else {
                                var TXBM = data.params.FID;
                                getTXBMInfo(TXBM);
                            }
                            break;
                    }
                // }
            });
            setMessage();
            setSize();
        });

        function setMessage() {
            window.parent.postMessage(
                {
                    functionName: "PageLoaded",
                    params: {
                    }
                },
                "*"
            );
            console.log("---ywpage发送：PageLoaded")
        }

        function setSize() {
            window.parent.postMessage(
                {
                    functionName: "resetSize",
                    params: {
                        width: 500,
                        height: 210
                    }
                },
                "*"
            );
            console.log("---ywpage发送：resetSize")
        }

        function getTXBMInfo(txbm) {
            $("#txbm").html(txbm);
            if (txbm == '297') {
                $("#fzdw").html("重庆弘昇管道有限公司");
                $("#szd").html("御临河北部流域十五排水分区");
                $("#whsj").html("2019/8/14");
                $("#xx").html("承建单位于2018年8月14日竣工，预计每年维护一次，负责人刘某某，联系电话：153XXXXXXXX。");
            } else if (txbm == '296') {
                $("#fzdw").html("重庆恒量管道有限公司");
                $("#szd").html("御临河北部流域十四排水分区");
                $("#whsj").html("2019/9/21");
                $("#xx").html("承建单位于2018年9月14日竣工，预计每年维护一次，负责人龚某某，联系电话：138XXXXXXXX。逾期维护。");
            } else {
                $("#fzdw").html("重庆威航管道有限公司");
                $("#szd").html("御临河北部流域九排水分区");
                $("#whsj").html("2019/5/11");
                $("#xx").html("承建单位于2018年5月20日竣工，预计每年维护一次，负责人谭某某，联系电话：139XXXXXXXX。已提前维护。");
            }
        }
      `,
    };
  },
};
</script>

<style scoped>
</style>