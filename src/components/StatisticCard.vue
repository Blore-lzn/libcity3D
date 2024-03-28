<script lang="ts" setup>
    import { ref } from 'vue'
    import { useTransition } from '@vueuse/core'
    import { ChatLineRound, Male } from '@element-plus/icons-vue'
    import dayjs from 'dayjs'

    const source = ref(0)
    const outputValue = useTransition(source, {
        duration: 1500,
    })
    source.value = 172000
    const running_time = ref(dayjs(0))

    setInterval(() => {
        running_time.value.add(1)
    }, 1000);
</script>

<template>
    <el-row>
        <el-col :span="6">
            <el-statistic title="运行时间" :value="running_time.format('HH:mm:ss')" />
        </el-col>
        <el-col :span="6">
            <el-statistic title="模型" value="SSTBAN" />
        </el-col>
        <el-col :span="6">
            <el-statistic title="数据集" value="BJTaxi">
            </el-statistic>
        </el-col>
        <el-col :span="6">
            <el-statistic title="数据规模" :value="562">
                <template #suffix>
                    <el-icon style="vertical-align: -0.125em">
                        <ChatLineRound />
                    </el-icon>
                </template>
            </el-statistic>
        </el-col>
    </el-row>
</template>

<style scoped>
    .el-col {
        text-align: center;
    }
</style>