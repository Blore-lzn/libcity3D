<script setup lang="ts">
    import MapContainer from '@/components/MapContainer.vue'

    import {
        Document,
        Menu as IconMenu,
        Location,
        Setting,
    } from '@element-plus/icons-vue'

    import { reactive, ref } from 'vue'
    defineProps(['isCollapse', 'handleOpen', 'handleClose', 'loadNodes', 'loadEdges'])

    const modeldialogFormVisible = ref(false)
    const geojsonDialogFormVisible = ref(false)
    const mapContainerVisible = ref(false)
    const graphContainerVisible = ref(false)
    const formLabelWidth = '140px'

    const form = reactive({
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
    })
</script>

<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
        @close="handleClose">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>3D数字渲染</span>
            </template>
            <el-menu-item-group title="数据">
                <el-menu-item index="1-1" @click="modeldialogFormVisible = true">选择要运行的模型</el-menu-item>
                <el-menu-item index="1-2" @click="geojsonDialogFormVisible = true">可视化GeoJson数据</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <template #title><span>加载</span></template>
                <el-menu-item index="1-3" @click="loadNodes('DATA/state_100081_100.json')">加载节点</el-menu-item>
                <el-menu-item index="1-4" @click="loadEdges('DATA/traj_2000_True.json')">加载轨迹</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="2" @click="mapContainerVisible = true">
            <el-icon><icon-menu /></el-icon>
            <template #title>2D数据展示</template>
        </el-menu-item>
        <el-menu-item index="3" @click="graphContainerVisible = true">
            <el-icon>
                <document />
            </el-icon>
            <template #title>深度数据分析</template>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>设置</template>
        </el-menu-item>

        <el-dialog v-model="modeldialogFormVisible" title="模型选择" width="500">
            <el-form :model="form">
                <el-form-item label="任务类型" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="模型名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="数据集" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="其他参数" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="modeldialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="modeldialogFormVisible = false">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog v-model="geojsonDialogFormVisible" title="可视化GeoJson数据" width="500">
            <el-form :model="form">
                <el-form-item label="GeoJson文件路径" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="modeldialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="modeldialogFormVisible = false">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog v-model="mapContainerVisible" title="2D地图">
            <MapContainer />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="mapContainerVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="modeldialogFormVisible = false">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog v-model="graphContainerVisible" title="数据分析">
            <MapContainer />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="graphContainerVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="modeldialogFormVisible = false">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </el-menu>
</template>