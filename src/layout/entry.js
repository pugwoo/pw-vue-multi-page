import Vue from 'vue'
import VueResource from 'vue-resource'

// weui vue封装
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'

import App from '__VUE_PATH__'

Vue.config.productionTip = false;

// 公共的组件可以在这里引入，在子组件中可以照常使用
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

// weui vue封装
Vue.use(WeVue)

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})
