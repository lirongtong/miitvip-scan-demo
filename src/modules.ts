import { App } from 'vue'
import 'ant-design-vue/lib/message/style/index.less'
import { message } from 'ant-design-vue'

const components = {message}
const antd = {
    install(app: App) {
        app.config.globalProperties.$message = message
        Object.keys(components).forEach((name) => {
            app.use(components[name])
        })
    }
}
export default antd