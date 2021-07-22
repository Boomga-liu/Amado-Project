<template>
  <div>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse mt-4">
      <div class="sidebar-sticky pt-3">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item" @click="chooseActive('Products')">
            <router-link
              class="nav-link"
              to="/admin/dashboard_products"
              :class="{ active: isActive === 'Products' }"
            >
              <i class="fas fa-box-open mr-1"></i>產品列表
            </router-link>
          </li>
          <li class="nav-item" @click="chooseActive('Orders')">
            <router-link
              class="nav-link"
              to="/admin/dashboard_backendorders"
              :class="{ active: isActive === 'Orders' }"
            >
              <i class="fal fa-list-alt mr-1"></i>訂單列表
            </router-link>
          </li>
          <li class="nav-item" @click="chooseActive('Coupons')">
            <router-link
              class="nav-link"
              to="/admin/dashboard_coupons"
              :class="{ active: isActive === 'Coupons' }"
            >
              <i class="fas fa-ticket-alt mr-1"></i>優惠券
            </router-link>
          </li>
        </ul>
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2" @click="chooseActive('CustomerOrder')">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/admin2"
              :class="{ active: isActive === 'CustomerOrder' }"
            >
              <i class="fas fa-shopping-cart mr-1"></i>
              模擬訂單
            </router-link>
          </li>
        </ul>
        <div class="sign-out">
          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
          >
            <span>登出</span>
            <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <ul class="nav flex-column mb-2">
            <li class="nav-item text-nowrap">
              <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: ''
    }
  },
  methods: {
    signout () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/logout`
      vm.chooseActive('Sign out')
      vm.$http.post(url).then(response => {
        if (response.data.success) {
          vm.$router.push('/login')
        }
      })
    },
    chooseActive (choose) {
      this.isActive = choose
    }
  },
  created () {
    this.$bus.$on('backendSidebar:active', (choose) => this.chooseActive(choose))
  }
}
</script>

<style scope lang="scss">
.sidebar-sticky {
  .sign-out {
    display: block;
    @media (min-width: 768px) {
      display: none;
    }
  }
}
</style>
