import WdpApi from "wdpapi"
import {WDP_APP_CONFIG} from "../config"
import { ElNotification } from "element-plus";
export class WdpApp {
    app: WdpApi;
    is_running: boolean;

    constructor() {
        this.app = new WdpApi(WDP_APP_CONFIG);
        this.is_running = false
    }

    async start(callback: () => void, handler: (e: Error) => void)   { 
        if(this.is_running) {
            handler(new Error("wdp app is running"))
        }
        await this.app.Renderer.Start().then((res: any) => {
            if (res.success) {
                this.app.Renderer.RegisterEvent([
                    {
                        name: 'onVideoReady', func: async function () {
                            ElNotification({
                                title: '视频流连接成功',
                                message: '',
                                type: 'success',
                            })
                        }
                    }
                ])
                this.app.Renderer.RegisterSceneEvent([
                    {
                        name: 'OnWdpSceneIsReady', func: async function () {
                            if(res.result.progress === 100) {
                                ElNotification({
                                    title: '场景加载完成',
                                    message: '',
                                    type: 'success',
                                })
                            }
                        }
                    }
                ])
                this.is_running = true
                callback()
            }
        }, (e: Error) => {
            handler(e)
        })
    }

    async loadNodes(dataPath: string, handler: (e: Error) => void) {
        if (!this.is_running) {
            handler(new Error("app is not running"))
        }
        const jsondata1 = {
            "apiClassName": "TIMNodeAPI",
            "apiFuncName": "CreateTIMNode",
            "args": {
                    "URL": dataPath,
                    "Height": 100,
                    "information": []
            }
        }
          
        await this.app.Customize.RunCustomizeApi(jsondata1).then((res: any) => {
            if (res) {
                console.log(res)
            }
        }, (e: Error) => {
            handler(e)
        })
    }

    async loadEdges(dataPath: string, handler: (e: Error) => void) {
        if (!this.is_running) {
            handler(new Error("app is not running"))
        }
        const jsondata = {
            "apiClassName": "TrafficAnalysisAPI",
            "apiFuncName": "CreateTrafficRoadSituationEntity",
            "args": {
                    "guid": "",
                    "roadDataUrl": dataPath,
                    "height": 50,
                    "width": 20,
                    "field": "voc",
                    "symbolMap": {
                            "0.5": "#00ff00",
                            "0": "#0000ff",
                            "1": "#ff0000"
                    }
            }
        }
          
        await this.app.Customize.RunCustomizeApi(jsondata).then((res: any) => {
            if (res) {
                console.log(res)
            }
        }, (e: Error) => {
            handler(e)
        })
    }

    async stop() {
        if (this.is_running) {
            this.app.Renderer.Stop()
        }
    }
}
