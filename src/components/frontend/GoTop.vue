<template>
  <div class="go-top" v-if="isShow">
    <a href="#" @click.prevent="goTop">
      <i class="fa fa-angle-up" aria-hidden="true"></i>
    </a>
  </div>
</template>
<script>
export default {
  props: ['height'],
  data () {
    return {
      isShow: ''
    }
  },
  // 監聽外部傳入的值
  watch: {
    height: function (value) {
      const vm = this
      if (value > 300) {
        vm.isShow = true
      } else {
        vm.isShow = false
      }
    }
  },
  methods: {
    goTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑移動
      })
    }
  }
}
</script>
