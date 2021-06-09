<template>
  <div class="main">
    <div class="header">
      <div class="headertitle">接口说明文档</div>
    </div>
    <div class="container">
      <el-row>
        <el-col :span="3">
          <div class="app">
            <div class="aside">
              <div class="menu">
                <el-menu
                  router
                  text-color="#000000"
                  :default-active="$route.path"
                  class="menu"
                  @open="handleOpen"
                  :default-openeds="opends"
                  @close="handleClose"
                  :collapse="isCollapse"
                >
                  <template v-for="(menu_v, menu_k) in menu">
                    <el-submenu v-if="menu_v.children" :key="menu_k" :index="1">
                      <template slot="title">
                        <span slot="title" class="spantitle">{{
                          menu_v.name
                        }}</span>
                      </template>
                      <el-menu-item
                        v-for="(
                          menuChildren_v, menuChildren_k
                        ) in menu_v.children"
                        :key="menuChildren_k"
                        :index="menuChildren_v.path"
                        class="itemboder"
                      >
                        <!-- <img :src="menuChildren_v.imgUrl" class="icon" :style="menuChildren_k == 6 ? {marginright:'20%',display:'inline-flex'} : {}"> -->
                        <span slot="title">{{ menuChildren_v.name }}</span>
                      </el-menu-item>
                    </el-submenu>
                  </template>
                </el-menu>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="21">
          <div class="app-body">
            <div id="mainContainer" class="main-container">
              <!--<transition name="fade">-->
              <router-view></router-view>
              <!--</transition>-->
            </div>
            <!-- <EuiFooter></EuiFooter> -->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opends: ["1"],
      menu: [
        {
          name: "GIS应用方法",
          children: [
            {
              name: "服务图斑定位",
              path: "/Position",
              imgUrl: require("../../assets/images/定位.png"),
            },
            {
              name: "弹窗大小设置",
              path: "/Windowsize",
              imgUrl: require("../../assets/images/弹窗.png"),
            },
            {
              name: "图层控制接口",
              path: "/LayerControl",
              imgUrl: require("../../assets/images/图层控制.png"),
            },
            {
              name: "添加临时元素",
              path: "/AddElements",
              imgUrl: require("../../assets/images/添加.png"),
            },
            {
              name: "删除临时元素",
              path: "/RemoveElements",
              imgUrl: require("../../assets/images/删除.png"),
            },
            {
              name: "图层要素筛选",
              path: "/ElementFiltering",
              imgUrl: require("../../assets/images/screen.png"),
            },
            {
              name: "行 政 区 定 位",
              path: "/AdministrativePositioning",
              imgUrl: require("../../assets/images/行政区定位.png"),
            },
            {
              name: "简单图形绘制",
              path: "/GraphicsRendering",
              imgUrl: require("../../assets/images/图形绘制.png"),
            },
            {
              name: "图层查询接口",
              path: "/QueryInterface",
              imgUrl: require("../../assets/images/图层查询项配置.png"),
            },
          ],
        },
      ],
    };
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #292c2d;
  height: 5vh;
  display: flex;
}

.headertitle {
  color: white;
  /* padding-top: 1vh; */
  padding-left: 2vh;
  font-size: 20px;
  font-weight: 1000;
  line-height: 5vh;
  text-align: center;
}

.container {
  height: 95vh;
  width: 100%;
}

.main {
  width: 100vw;
  height: 100vh;
}

.spantitle {
  font-weight: 1000;
  font-size: 14px;
}

.aside {
  border: 1px solid #c0c0c0;
  border-style: none solid none none;
  height: 95vh;
}

.app-body {
  width: 100%;
  height: 95vh;
}

.main-container {
  /* border: 1px solid black; */
  height: 95vh;
}

.itemboder {
  /* border-bottom: solid 1px rgba(192, 192, 192, 0.5); */
  text-align: center;
  justify-content: center;
}

/* .menu {
  background-color: #808080;
  background-color: #f7f7f7;
}

.spantitle {
  color: white;
  color: #666;
} */

.icon {
  display: inline-flex;
  margin-right: 2%;
}

.el-menu-item {
  font-size: 14px;
}

.el-submenu .el-menu-item {
  height: 30px;
  line-height: 30px;
}

.itemboder {
  text-align: left;
}
</style>

<style>
.el-submenu__title {
  line-height: 30px;
  height: 30px;
}
</style>

