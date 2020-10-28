<template>
    <a href="https://www.makeit.vip" target="_blank"><img class="logo" alt="Makeit Vip logo" src="./assets/logo.png" /></a>
    <video class="video" id="video" ref="video" autoplay v-if="!iphone"></video>
    <div class="photograph" v-if="iphone">
        <a-button type="danger" size="large">拍照 - 扫描解析二维码 / 条形码</a-button>
        <input class="file" type="file" ref="camera" capture="camera" accept="image/*" @change="change" />
        <img id="preview" alt="preview" v-if="preview" />
    </div>
    <a-modal v-model:visible="modalVisible" centered title="温馨提示：扫描解析成功" okText="刷新后再次进行识别操作" cancelText="关闭" @ok="reload" @cancel="cancel">
        <p>扫描结果：<a :href="content" target="_blank">{{ content }}</a></p>
        <p>扫描时间：{{ time }}</p>
    </a-modal>
</template>

<script lang="ts">
    import { defineComponent, ref, reactive } from 'vue'
    import { BrowserMultiFormatReader } from '@zxing/library/esm/browser/BrowserMultiFormatReader'

    export default defineComponent({
        
        setup() {
            const iphone = ref(false)
            const errMsg = ref('')
            const time = ref(null)
            const content = ref(null)
            const preview = ref(false)
            const modalVisible = ref(false)
            const reader = new BrowserMultiFormatReader()
            return {iphone, errMsg, time, content, preview, modalVisible, reader}
        },

        methods: {
            async openCamera() {
                this.$message.success({
                    content: '正在尝试拉起摄像头 ...',
                    duration: 0
                })
                if (!navigator.mediaDevices) {
                    this.$message.destroy()
                    this.iphone = true
                    this.$message.success({
                        content: 'iPhone 其它浏览器无权限自动开启摄像头 ...',
                        duration: 0
                    })
                } else {
                    this.reader.listVideoInputDevices().then((devices) => {
                        if (devices.length <= 0) {
                            this.$message.destroy();
                            this.$message.warning({
                                content: '当前没有可用的摄像头设备 ...',
                                duration: 0
                            })
                        } else {
                            devices.forEach((device) => {
                                this.$message.success({
                                    content: `id: ${device.deviceId}\r\nlabel: ${device.label}\r\ntype: ${device.kind}`,
                                    duration: 0
                                })
                            })
                            this.decode(devices[0].deviceId)
                        }
                    }).catch((err) => {
                        this.errMsg = err
                        this.$message.destroy()
                        this.$message.error({
                            content: err,
                            duration: 0
                        })
                    })
                }
            },

            decode(id: any) {
                this.reader.reset()
                this.$message.destroy()
                this.$message.success({
                    content: '正在尝试识别，请对准摄像头 ...',
                    duration: 0
                })
                this.reader.decodeOnceFromVideoDevice(id, 'video').then((res) => {
                    this.$message.destroy()
                    this.content = res.text
                    this.time = new Date(res.timestamp)
                    this.modalVisible = true
                }).catch((err) => {
                    this.$message.destroy()
                    this.$message.error({
                        content: '识别失败，请刷新后再次尝试 ...',
                        duration: 0
                    })
                    this.errMsg = err
                })
            },

            decodeFromImage() {
                const image = document.getElementById('preview') as HTMLImageElement
                this.reader.decodeFromImage(image).then((res) => {
                    this.$message.destroy()
                    this.content = res.text
                    this.time = new Date(res.timestamp)
                    this.modalVisible = true
                }).catch((err) => {
                    this.$message.destroy()
                    this.$message.error({
                        content: '识别失败，请刷新后再试',
                        duration: 0
                    })
                    this.errMsg = err
                })
            },

            change() {
                const vm = this
                vm.$message.success({
                    content: '正在识别图片，请稍候 ...',
                    duration: 0
                })
                const files = (this.$refs.camera as any).files
                const file = files[files.length - 1]
                const reader = new FileReader()
                reader.onload = (e: any) => {
                    this.preview = true
                    vm.$nextTick(() => {
                        const image = document.getElementById('preview') as HTMLInputElement
                        if (image) image.src = e.target.result
                        this.decodeFromImage()
                    })
                }
                reader.readAsDataURL(file)
            },

            reload() {
                window.location.reload()
            },

            cancel() {
                this.$message.success({
                    content: '上次扫描解析成功，请刷新后再次尝试识别 ...',
                    duration: 0
                })
            }
        },

        mounted() {this.openCamera()}
    })
</script>