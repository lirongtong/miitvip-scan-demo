import { App } from 'vue'
import 'ant-design-vue/lib/message/style/index.less'
import 'ant-design-vue/lib/modal/style/index.less'
import 'ant-design-vue/lib/button/style/index.less'
import { message, Modal, Button } from 'ant-design-vue'

const components = { message, Modal, Button } as any
const antd = {
    install(app: App) {
        app.config.globalProperties.$message = message
        Object.keys(components).forEach((name) => {
            app.use(components[name])
        })
    }
}
export default antd