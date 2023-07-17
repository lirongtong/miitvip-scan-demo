import { SharedConfig } from "vite";

const config: SharedConfig = {
    cssPreprocessOptions: {
        less: {
            javascriptEnabled: true
        }
    }
}
export default config