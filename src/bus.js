import Vue from "vue";
Vue.prototype.$bus = new Vue({});
// 在Vue的prototype下新增$bus屬性，而且指向一個物件

// 自定義名稱 'messsage:push'
// message: 傳入參數
// status: 樣式，預設值為 warning
// vm.$bus.$emit('message:push');
