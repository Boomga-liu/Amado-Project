<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav class="navbar fixed-top flex-md-nowrap p-0 shadow bg-color">
      <router-link to="/shop" class="navbar-brand col-md-3 col-lg-2 mr-0 px-3 text-center">
        <img src="@/assets/images/core-img/logo2.png" class="img-fluid" alt="icon" />
      </router-link>
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="bars-icon">
          <i class="fas fa-bars"></i>
        </span>
      </button>
      <ul class="navbar-nav px-3 sign-out">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    signout () {
      const vm = this
      vm.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/logout`
      vm.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.isLoading = false
          vm.$router.push('/')
        }
      })
    }
  }
}
</script>

<style scope lang="scss">
.bg-color,
.navbar-brand {
  background-color: #4f4f4f;
}

.navbar-nav {
  a {
    font-size: 16px;
  }
}
.bars-icon {
  i {
    color: #fff;
  }
}
</style>
