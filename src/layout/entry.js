import Vue from 'vue'
import VueResource from 'vue-resource'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from '__VUE_PATH__'

Vue.config.productionTip = false;

// 公共的组件可以在这里引入，在子组件中可以照常使用
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

Vue.use(ElementUI);

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})
