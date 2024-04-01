<script setup>
    import { onMounted, onUnmounted } from "vue";
    import AMapLoader from "@amap/amap-jsapi-loader";
    import { MAP_SECURITY_CODE } from "../config"

    let map = null;
    // TODO: make it safer
    window._AMapSecurityConfig = {
        securityJsCode: MAP_SECURITY_CODE,
    };
    onMounted(() => {
        AMapLoader.load({
            key: "27ab062a86c341ba6a16552295cbb542", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
        })
            .then((AMap) => {
                map = new AMap.Map("container", {
                    // 设置地图容器id
                    viewMode: "3D", // 是否为3D地图模式
                    zoom: 11, // 初始化地图级别
                    center: [116.397428, 39.90923], // 初始化地图中心点位置
                });
                // AMap.plugin("AMap.GeoJSON", function () {
                //     //创建 geoJSON 实例，传入 GeoJSON 数据和其他选项
                //     var geoJson = new AMap.GeoJSON({
                //         //将字符串形式的 GeoJSON 数据解析为对象
                //         geoJSON: traj_1000,
                //         //定义一个回调函数来创建多边形对象，该函数接收一个 geojson 对象和一个 lnglats 数组作为参数
                //         getPolygon: function (geojson, lnglats) {
                //             // 返回一个新的 AMap.Polygon 对象，传入路径、填充透明度、边框颜色和填充颜色等选项
                //             //还可以自定义 getMarker 和 getPolyline，用于创建标记和折线对象
                //             return new AMap.Polygon({
                //                 path: lnglats,
                //                 fillOpacity: 0.8,
                //                 strokeColor: "white",
                //                 fillColor: "red",
                //             });
                //         },
                //     });
                //     //将geoJson对象添加到地图上
                //     map.add(geoJson);
                // });


            })
            .catch((e) => {
                console.log(e);
            });
    });

    onUnmounted(() => {
        map?.destroy();
    });
</script>

<template>
    <div id="container"></div>
</template>

<style scoped>
    #container {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 800px;
    }
</style>