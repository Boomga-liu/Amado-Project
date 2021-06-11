<template>
  <div>
    <div class="mobile-nav d-flex d-md-none">
      <div class="logo">
        <router-link to="/shop">
          <div class="mobile-logo bg-cover"></div>
        </router-link>
      </div>
      <button class="btn btn-primary toggle-btn" type="button" @click="toggleActive">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <div class="header-area" :class="{ active: headerActive }">
      <header class="header">
        <div class="logo">
          <router-link to="/shop">
            <div class="header-logo bg-cover"></div>
          </router-link>
        </div>
        <nav class="menu">
          <ul class="list-unstyled">
            <li @click="chooseActive('HOME')" :class="{ active: isActive === 'HOME' }">
              <router-link to="/shop">Home</router-link>
            </li>
            <li @click="chooseActive('PRODUCTS')" :class="{ active: isActive === 'PRODUCTS' }">
              <router-link to="/shop/products">Products</router-link>
            </li>
            <li @click="chooseActive('CART')" :class="{ active: isActive === 'CART' }">
              <router-link to="/shop/cartcheckout">Cart</router-link>
            </li>
            <li @click="chooseActive('LOGIN')" :class="{ active: isActive === 'LOGIN' }">
              <router-link to="/shop/login">Log In</router-link>
            </li>
            <li @click="chooseActive('CHECKOUT')" :class="{ active: isActive === 'CHECKOUT' }">
              <router-link to="/shop/checkout">Checkout</router-link>
            </li>
            <li @click="chooseActive('IMAGEPAGE')" :class="{ active: isActive === 'IMAGEPAGE' }">
              <router-link to="/">Image Page</router-link>
            </li>
          </ul>
        </nav>
        <div class="header-btn-group">
          <ul class="list-unstyled mb-0">
            <li @click="chooseActive('COUPONS')">
              <router-link
                to="/shop/coupons"
                class="btn mb-3"
                :class="{active: isActive === 'COUPONS'}"
              >%Coupons%</router-link>
            </li>
            <li @click="chooseActive('NEWTHISWEEK')">
              <router-link
                to="/shop/newthisweek"
                class="btn"
                :class="{active: isActive === 'NEWTHISWEEK'}"
              >New This Week</router-link>
            </li>
          </ul>
        </div>
        <div class="cart-fav-search">
          <ul class="cart-fav list-unstyled">
            <li
              class="cart-number-position"
              :class="{ active : isActive === 'CART' }"
              @click="chooseActive('CART')"
            >
              <router-link to="/shop/cartcheckout">
                <div class="cart-img d-inline-block align-middle mr-2"></div>Cart
              </router-link>
              <div class="cart-number" v-if="getCartLength">{{ getCartLength }}</div>
            </li>
            <li
              class="cart-number-position"
              :class="{ active : isActive === 'FAVORITE'}"
              @click="chooseActive('FAVORITE')"
            >
              <router-link to="/shop/favorite">
                <div class="fav-img d-inline-block align-middle mr-2"></div>Favorite
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
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">SEARCH</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary text-white">Search</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: '',
      headerActive: false,
      cartData: [],
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
    getLocalStorage () {
      this.cartData = JSON.parse(localStorage.getItem('cartData')) || []
    }
  },
  computed: {
    favLength () {
      return this.$store.state.Fav.length
    },
    getCartLength () {
      if (this.cartData.length > 0) {
        return this.cartData.length
      } else {
        return 0
      }
    }
  },
  created () {
    this.getLocalStorage()
    // created時 Vue 底下註冊監聽"cart:get"事件
    this.$bus.$on('localStorage:get', () => this.getLocalStorage())
    this.$bus.$on('menu:active', (choose) => this.chooseActive(choose))
  }
}
</script>
