<template>
  <div class="wrapper">
    <div class="d-flex">
      <Navbar />
      <AlertMessage />
      <main role="main" class="container-fluid container-fluid-custom">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </main>
    </div>
    <GoTop :height="indexHeight" />
    <Subscribe />
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue'
import Navbar from './Navbar.vue'
import Subscribe from './Subscribe.vue'
import GoTop from '@/components/frontend/GoTop.vue'
import AlertMessage from '@/components/AlertMessage.vue'
export default {
  data () {
    return {
      keepAlive: [],
      indexHeight: ''
    }
  },
  components: {
    Footer,
    Navbar,
    Subscribe,
    GoTop,
    AlertMessage
  },
  methods: {
    handleScroll (e) {
      this.indexHeight = window.scrollY
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, false)
  }
}
</script>

<style lang="scss"></style>
