import { createApp } from 'vue'
import { createYmaps } from 'vue-yandex-maps';
import App from './App.vue'

const app = createApp(App);

app.use(createYmaps({
  apikey: 'b139e6b6-4bb1-4ec7-998a-59bd2a4d4541',
}));

app.mount('#app');
