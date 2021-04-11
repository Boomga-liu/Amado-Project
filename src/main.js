import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios' // 主要 AJAX 套件
import VueAxios from 'vue-axios' // 將 AJAX 套件轉為 Vue 套件
import Loading from 'vue-loading-overlay' // Loading套件
import 'vue-loading-overlay/dist/vue-loading.css' // Loading套件css
import 'bootstrap'
import Aos from 'aos'
import '../node_modules/aos/dist/aos.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import swiper, { Navigation, Pagination, Autoplay } from 'swiper'
// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

// 將元件以及相關設定檔從"vee-validate"導出
// ValidationObserver是input驗證元件
// ValidationProvider是整體<from>驗證元件
// extend是VeeValidate的一些擴充功能
// localize是語系設定
// configure是設定檔
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure
} from 'vee-validate'
// 導出繁體中文語系以便使用
import TW from 'vee-validate/dist/locale/zh_TW.json'
// 導出內建的驗證規則使用
import * as rules from 'vee-validate/dist/rules'

import App from './App.vue'
import router from './router'
import store from './store'
import './bus'
import currencyFilter from './filters/currency'

// 把導出的規則加入VeeValidate的擴充功能裡
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})
// 使用繁體中文語系
localize('zh_TW', TW)
// 針對單一<input>驗證
Vue.component('ValidationObserver', ValidationObserver)
// 針對<from>表單驗證
Vue.component('ValidationProvider', ValidationProvider)
// classname設定檔，此為bootstrap驗證的設定樣式
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(Aos)
Aos.init()
Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.use(VueAwesomeSwiper)
swiper.use([Navigation, Pagination, Autoplay])

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

// 導航守衛
router.beforeEach((to, from, next) => {
  // 解決切換頁面滾動條不會自動回到頂部的問題
  window.scrollTo(0, 0)

  // console.log("to", to, "from", from, "next", next);
  // 判斷該網頁是否需要驗證
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    // API伺服器路徑 / api / user / check
    axios.post(api).then((response) => {
      // console.log(response.data);
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
