# 扫描解析二维码 / 条形码
> 整个 Demo 项目采用的是 Vue3 + Vite + zxing + Ant Design Vue 构建。实现 Web 浏览器端拉起摄像头，扫描二维码 / 条形码并对其解析的功能。（注意：iPhone 系列的手机，除了 Safari 自带浏览器外，其它任何的浏览器是没有权限配置网站是否可用摄像头的，所以采用折中的解决方案，拉起摄像头后拍照进行识别）。

> Demo 体验地址：[https://scan.makeit.vip/](https://scan.makeit.vip/)

## 证书
> `localhost` 支持调试，需要用其它任何域名来调试的话，先配置 `https`（我测试的时候用的是 `letsencrypt` + `docker` 来生成免费的 `https` 证书的）

## 运行
```
git clone https://github.com/lirongtong/miitvip-canvas-demo.git
cd miitvip-scan-demo
npm install
npm run dev
```