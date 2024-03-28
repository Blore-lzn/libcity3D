<script setup lang="ts">
  import { WdpApp } from "./model/render"
  import { ref } from 'vue'
  import AsideMenu from '@/components/AsideMenu.vue'
  import StatisticCard from '@/components/StatisticCard.vue'
  import { ElNotification } from 'element-plus'

  const isCollapse = ref(false)
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const is_loading = ref(true)

  const err_handler = (e: Error) => {
    ElNotification({
      title: 'Error',
      message: e.toString(),
      type: 'error',
    })
    console.error(e)
  }

  const app = new WdpApp()

  // app.start(() => {
  //   is_loading.value = false
  // }, err_handler)

  const loadNodes = async (dataPath: string) => {
    app.loadNodes(dataPath, err_handler)
  }

  const loadEdges = async (dataPath: string) => {
    app.loadEdges(dataPath, err_handler)
  }
</script>

<template>
  <div class="common-layout" style="margin-bottom: 100px">
    <el-header>

    </el-header>
    <el-container>
      <el-aside style="background-color:azure">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :value="false">expand</el-radio-button>
          <el-radio-button :value="true">collapse</el-radio-button>
        </el-radio-group>
        <AsideMenu :isCollapse="isCollapse" :handleOpen="handleOpen" :handleClose="handleClose" :loadNodes="loadNodes"
          :loadEdges="loadEdges" />
      </el-aside>
      <el-main>
        <StatisticCard />
        <div id="wdp_containter" style="width:80vw;height: 150vh;;background-color:azure" v-loading="is_loading"
          element-loading-text="Loading..." element-loading-background="rgba(122, 122, 122, 0.8)">
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped></style>
