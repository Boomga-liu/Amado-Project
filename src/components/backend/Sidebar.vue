<template>
  <div>
    <nav
      id="sidebarMenu"
      class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse mt-4"
    >
      <div class="sidebar-sticky pt-3">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>管理員</span>
          <a
            class="d-flex align-items-center text-muted"
            href="#"
            aria-label="Add a new report"
          >
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item" @click="isChoose = 'Products'">
            <router-link
              class="nav-link"
              to="/admin/products"
              :class="{ active: isChoose === 'Products' }"
              ><i class="fas fa-box-open mr-1"></i>產品列表</router-link
            >
          </li>
          <li class="nav-item" @click="isChoose = 'Orders'">
            <router-link
              class="nav-link"
              to="/admin/backendorders"
              :class="{ active: isChoose === 'Orders' }"
              ><i class="fal fa-list-alt mr-1"></i>訂單列表
            </router-link>
          </li>
          <li class="nav-item" @click="isChoose = 'Coupons'">
            <router-link
              class="nav-link"
              to="/admin/coupons"
              :class="{ active: isChoose === 'Coupons' }"
              ><i class="fas fa-ticket-alt mr-1"></i>優惠券
            </router-link>
          </li>
        </ul>
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>模擬功能</span>
          <a
            class="d-flex align-items-center text-muted"
            href="#"
            aria-label="Add a new report"
          >
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2" @click="isChoose = 'CustomerOrder'">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/customer_order"
              :class="{ active: isChoose === 'CustomerOrder' }"
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
            <a
              class="d-flex align-items-center text-muted"
              href="#"
              aria-label="Add a new report"
            >
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <ul class="nav flex-column mb-2" @click="isChoose = 'Sign Out'">
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
import $ from 'jquery';
export default {
  data() {
    return {
      isChoose: '',
    };
  },
  methods: {
    signout() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(url).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push('/login');
        }
      });
    },
  },
};
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
