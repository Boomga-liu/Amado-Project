<template>
  <div>
    <Navbar />
    <AlertMessage />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-80">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AlertMessage from "./AlertMessage";
export default {
  components: {
    Navbar,
    Sidebar,
    AlertMessage
  },
  created() {
    // 讀取Cookie
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // console.log(myCookie);
    // 往後端送Cookie
    this.$http.defaults.headers.common.Authorization = myCookie;
  }
};
</script>

<style scope lang="scss">
.mt-80 {
  margin-top: 80px;
}
</style>
