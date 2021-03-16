<template>
  <div>
    <div class="mobile-nav d-flex d-md-none">
      <div class="logo">
        <router-link to="/">
          <div class="mobile-logo bg-cover"></div>
        </router-link>
      </div>
      <button class="btn btn-primary toggle-btn" @click.prevent="toggleActive">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <div class="header-area" :class="{ active: headerActive === true }">
      <header class="header">
        <div class="logo">
          <router-link to="/">
            <div class="header-logo bg-cover"></div>
          </router-link>
        </div>
        <nav class="menu">
          <ul class="list-unstyled">
            <li @click.prevent="chooseActive('HOME')" :class="{ active: isActive === 'HOME' }">
              <router-link to="/">HOME</router-link>
            </li>
            <li @click="chooseActive('SHOP')" :class="{ active: isActive === 'SHOP' }">
              <router-link to="/shop">SHOP</router-link>
            </li>
            <li @click="chooseActive('CART')" :class="{ active: isActive === 'CART' }">
              <router-link to="/cart">CART</router-link>
            </li>
            <li @click="chooseActive('LogIn')" :class="{ active: isActive === 'LogIn' }">
              <router-link to="/login">LOG IN</router-link>
            </li>
            <li @click="chooseActive('CHECKOUT')" :class="{ active: isActive === 'CHECKOUT' }">
              <router-link to="/checkout">CHECKOUT</router-link>
            </li>
          </ul>
        </nav>
        <div class="header-btn-group">
          <a href="#" class="btn header-btn mb-3 active">%Discount%</a>
          <a href="#" class="btn header-btn">New This Week</a>
        </div>
        <div class="cart-fav-search">
          <ul class="cart-fav list-unstyled">
            <li
              class="cart-number-position"
              :class="{ active : isActive === 'CART' }"
              @click.prevent="chooseActive('CART')"
            >
              <router-link to="/cart">
                <div class="cart-img d-inline-block align-middle mr-2"></div>CART
              </router-link>
              <div class="cart-number" v-if="cartsLength">{{ cartsLength }}</div>
            </li>
            <li
              class="cart-number-position"
              :class="{ active : isActive === 'FAVORITE'}"
              @click.prevent="chooseActive('FAVORITE')"
            >
              <router-link to="/favorite">
                <div class="fav-img d-inline-block align-middle mr-2"></div>FAVORITE
              </router-link>
              <div class="fav-number" v-if="favLength">{{ favLength }}</div>
            </li>
          </ul>
        </div>
        <div class="social-info">
          <ul class="list-unstyled d-flex justify-content-between">
            <li>
              <a href="#">
                <i class="fab fa-pinterest"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: '',
      headerActive: false,
      carts: [],
      cartsLength: '',
      productId: '',
      products: []
    }
  },
  methods: {
    toggleActive () {
      this.headerActive = !this.headerActive
    },
    chooseActive (choose) {
      this.isActive = choose
      this.headerActive = false
    },
    getCart () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.$http.get(url).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          vm.carts = response.data.data
          vm.cartsLength = vm.carts.carts.length
        }
      })
    }
  },
  computed: {
    favLength () {
      return this.$store.state.Fav.length
    }
  },
  created () {
    this.getCart()
    // created時 Vue 底下註冊監聽"cart:get"事件
    this.$bus.$on('cart:get', () => this.getCart())
    this.$bus.$on('menu:active', (choose) => this.chooseActive(choose))
  }
}
</script>
