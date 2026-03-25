import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())  // gerenciamento de estado global
app.use(router)         // navegação entre páginas
app.use(vuetify)        // componentes e tema visual

app.mount('#app')
