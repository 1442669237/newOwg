import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 引入 normalize.css   
import './assets/normalize.css';
// 引入 vant 样式   
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'



const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
