<template>
  <div>
    <div class="editorwrap" id="editorwrap">
      <div class="left">
        <!-- <div>
          代码编辑器
        </div> -->
        <div class="editor">
          <div class="editorheader">HTML</div>
          <textarea ref="htmleditor"></textarea>
        </div>
        <!-- <div class="editor">
          <div class="editorheader">CSS</div>
          <textarea ref="csseditor"></textarea>
        </div>
        <div class="editor">
          <div class="editorheader">JavaScript</div>
          <textarea ref="jseditor"></textarea>
        </div> -->
      </div>

      <div class="resize"></div>
      <div class="right" id="right">
        <div class="editorheader">代码执行结果</div>
        <iframe class="iframe" ref="iframe" id="mobsf" width="100%" />
      </div>
    </div>
    <div>
      <div>
        <button @click="showDrawer" class="rightbutton"></button>
        <a-drawer
          width="40vw"
          style="top: 5vh"
          title
          placement="right"
          :closable="false"
          :visible="visible"
          :after-visible-change="afterVisibleChange"
          @close="onClose"
          :maskClosable="false"
          :mask="false"
        >
          <button @click="showDrawer" class="rightbutton2"></button>
          <div>
            <!-- <a-tabs default-active-key="1" >
              <a-tab-pane key="1" tab="使用文档"></a-tab-pane>
            </a-tabs> -->

            <el-tabs>
              <el-tab-pane label="文档说明"></el-tab-pane>
            </el-tabs>
            <div>
              <div v-for="(data, index) in Data" :key="index">
                <div v-if="data.type == 'topname'">
                  <p>
                    <strong>{{ data.lable }}</strong>
                  </p>
                  <ul>
                    <li>{{ data.value }}</li>
                  </ul>
                </div>
                <div v-else-if="data.type == 'table'">
                  <p>
                    <strong>{{ data.lable }}</strong>
                  </p>
                  <el-table
                    :data="data.columns"
                    style="width: 100%"
                    border
                    :header-cell-style="{
                      background: 'rgb(64,158,255)',
                      color: 'white',
                    }"
                  >
                    <el-table-column
                      prop="type"
                      label="类型"
                      width="100"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="functionName"
                      label="functionName"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="params"
                      label="params"
                    >
                    </el-table-column>
                  </el-table>
                </div>
                <div v-else-if="data.type == 'note'">
                  <p>
                    <strong>{{ data.lable }}</strong>
                  </p>
                  <ul>
                    <li>{{ data.value }}</li>
                  </ul>
                </div>
              </div>

              <div v-for="(exam, idx) in Example" :key="idx">
                <p>
                  <strong>{{ exam.lable }}</strong>
                </p>
                <pre class="code">
                      <code >
                        {{exam.value}}
                      </code>
                </pre>
              </div>
            </div>
          </div>
        </a-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import "codemirror/lib/codemirror.css";
import codemirror from "codemirror";

import "codemirror/theme/material.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/theme/ttcn.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/xq-light.css";
import "codemirror/theme/solarized.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xquery/xquery";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";

import "codemirror/addon/fold/foldcode.js";
// import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/xml-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/comment-fold.js";

import "codemirror/addon/scroll/simplescrollbars.css";
import "codemirror/addon/scroll/simplescrollbars";

import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/closetag.js";
import "codemirror/keymap/sublime.js";

import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/css-hint.js";
import "codemirror/addon/hint/html-hint.js";
import "codemirror/addon/hint/javascript-hint.js";
export default {
  name: "index",
  props: ["HTML", "CSS", "JAVASCRIPT", "Data", "Example"],
  data() {
    return {
      screenWidth :"",
      rightwidth:'',
      editorwrapwidth:'',
      val:'',
      timer: true,
      visible: false,
      htmleditor: "",
      htmloptions: {
        lineNumbers: true,
        line: true,
        tabSize: 2,
        mode: "htmlmixed",
        // theme: "neo",
        foldGutter: false,
        scrollbarStyle: "simple",
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        autoCloseTags: true,
        autoCloseBrackets: true,
        extraKeys: {
          "Ctrl-Q": function (cm) {
            cm.foldCode(cm.getCursor());
          },
        },
      },
      htmlcontent: "",
      csseditor: "",
      cssoptions: {
        lineNumbers: true,
        line: true,
        tabSize: 2,
        mode: "css",
        theme: "neo",
        foldGutter: false,
        scrollbarStyle: "simple",
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        autoCloseBrackets: true,
        extraKeys: {
          "Ctrl-Q": function (cm) {
            cm.foldCode(cm.getCursor());
          },
        },
      },
      csscontent: "",
      jseditor: "",
      jsoptions: {
        lineNumbers: true,
        // lineWrapping: true,
        line: true,
        tabSize: 2,
        mode: { name: "javascript", globalVars: true },
        theme: "neo",
        foldGutter: false,
        scrollbarStyle: "simple",
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        autoCloseBrackets: true,
        extraKeys: {
          "Ctrl-Q": function (cm) {
            cm.foldCode(cm.getCursor());
          },
          "Ctrl-W": "autocomplete",
        },
        keyMap: "sublime",
      },
      jscontent: "",
    };
  },
  methods: {
    showDrawer() {
      this.visible = !this.visible;
    },

    initeditor() {
      this.htmleditor = codemirror.fromTextArea(
        this.$refs.htmleditor,
        this.htmloptions
      );

      this.htmleditor.foldCode(codemirror.Pos(0, 0));
      this.htmleditor.on("change", (editor) => {
        this.htmlcontent = editor.getValue();
        this.renderCode();
      });
      // this.csseditor = codemirror.fromTextArea(
      //   this.$refs.csseditor,
      //   this.cssoptions
      // );
      // this.csseditor.foldCode(codemirror.Pos(0, 0));
      // this.csseditor.on("change", (editor) => {
      //   this.csscontent = editor.getValue();
      //   this.renderCode();
      // });
      // this.jseditor = codemirror.fromTextArea(
      //   this.$refs.jseditor,
      //   this.jsoptions
      // );
      // this.jseditor.foldCode(codemirror.Pos(0, 0));
      // this.jseditor.on("change", (editor) => {
      //   this.jscontent = editor.getValue();
      //   this.renderCode();
      // });
    },

    renderCode() {
      var html;
      var S =
        '<script src="https://cdn.bootcdn.net/ajax/libs/jquery/2.2.3/jquery.min.js">' +
        "<" +
        "/" +
        "script" +
        ">";
        html = this.htmlcontent;
      const iframe = this.$refs.iframe;
      console.log("iframe", this.jscontent, html);
      const document = iframe.contentDocument;
      const documentContents = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        ${S}
        <title>Document</title>
        </head>
        <body>
        ${html}
        </body>
        </html>
    `;
      document.open();
      document.write(documentContents);
      document.close();
    },

    dragControllerDiv: function () {
      var resize = document.getElementsByClassName("resize");
      var left = document.getElementsByClassName("left");
      var mid = document.getElementsByClassName("right");
      var box = document.getElementsByClassName("editorwrap");
      for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件

        resize[i].onmousedown = function (e) {
          var startX = e.clientX + 200;
          resize[i].left = resize[i].offsetLeft;
          document.querySelector("iframe").style["pointer-events"] = "none";
          // 鼠标拖动事件
          document.onmousemove = function (e) {
            var endX = e.clientX;
            var moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
            var maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
            if (moveLen < 150) moveLen = 150; // 左边区域的最小宽度为150px
            if (moveLen > maxT - 630) moveLen = maxT - 630; //右边区域最小宽度为630px
            resize[i].style.left = moveLen; // 设置左侧区域的宽度
            for (let j = 0; j < left.length; j++) {
              left[j].style.width = moveLen + "px";
              mid[j].style.width = box[i].clientWidth - moveLen - 5 + "px";
            }
          };
          // 鼠标松开事件

          document.onmouseup = function () {
            document.querySelector("iframe").style["pointer-events"] = "auto";
            document.onmousemove = null;
            document.onmousedown = null;
            resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
          };
          resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
          return false;
        };
      }
    },
  },
  mounted() {
    this.dragControllerDiv();
    this.initeditor();
    this.htmleditor.setValue(this.HTML+this.CSS+"<" +
          "script" +
          ">" +
          this.JAVASCRIPT +
          "<" +
          "/" +
          "script" +
          ">"|| this.htmleditor+this.csseditor+this.jseditor);
    // this.csseditor.setValue(this.CSS || this.csseditor);
    // this.jseditor.setValue(this.JAVASCRIPT || this.jseditor);
    console.log(this.HTML);

     this.screenWidth = document.body.clientWidth;
      window.onresize = () => {
        return (() => {
          this.screenWidth = document.body.clientWidth;
          this.rightwidth = document.getElementById('right').clientWidth
          document.getElementById('right').style.width = this.rightwidth/this.screenWidth*this.val+'vw'
        })();
      }
  },

  watch:{
    screenWidth(val){
        this.val = val
        this.screenWidth = document.body.clientWidth;
        this.rightwidth = document.getElementById('right').clientWidth
        document.getElementById('right').style.width = this.rightwidth/this.screenWidth*this.val+'vw'
    },
    rightwidth(val){
      console.log(val)
    }
  }
};
</script>

<style scoped>
.rightbutton {
	position: absolute;
	z-index: 100;
	right: 0vw;
	width: 14px;
	height: 90px;
	top: 50%;
	margin-top: -45px;
	background: url(../../assets/images/result.png) no-repeat 0 -142px;
	border: 0 none;
	outline: none;
}

.rightbutton2 {
	position: absolute;
	z-index: 100;
	left: 0vw;
	width: 14px;
	height: 90px;
	top: 50%;
	margin-top: -45px;
	background: url(../../assets/images/result.png) no-repeat 0 -242px;
	border: 0 none;
	outline: none;
}

strong {
	font-weight: 1000;
}

ul {
	display: block;
	list-style-type: disc;
	margin-block-start: 1%;
	margin-block-end: 1%;
	margin-inline-start: 0;
	margin-inline-end: 0;
	padding-inline-start: 40px;
}

li {
	display: list-item;
}

.code {
	line-height: 1.8;
	font-size: 14px;

/* padding: 5px 20px; */
	background-color: #fafafa;
	border: 1px solid #eaeefb;
	margin-bottom: 25px;
	border-radius: 4px;
}

.resize {
	width: 5px;
	height: 100%;
	cursor: w-resize;

/* float: left; */
	display: flex;
	border: 3px solid #d3d3d3;
	flex-direction: column;
}

</style>

<style lang="less" scoped>
.editorwrap {
	display: flex;
	width: 100%;
	height: 95vh;
	overflow: hidden;
	.left,
	.right {
		height: 95vh;
	}
	.left {
		width: calc(30% - 5px);
		width: 30%;
		display: flex;

// float:left;
		height: 94vh;
		flex-direction: column;
	}
	.right {
		width: 70%;
		// float:left;
	}
	.editor {
		flex: 1;
		// float: left;
	}
	.editorheader {
		height: 30px;

// background-color: #808080;
		background-color: #f7f7f7;

// color: #fff;
		color: #666;
		display: flex;
		align-items: center;
		padding-left: 20px;
		font-size: 14px;
	}
	.iframe {
		width: 100%;
		height: 94vh;
		border: none;
		// pointer-events:none
	}
}

</style>

<style>
.CodeMirror {
	/* height: 265px; */
	height: 91.5vh;
}

.el-table .cell {
  white-space: pre-line;
}
</style>