<template>
  <div class="px-3 py-150 cartcheckout-area">
    <loading :active.sync="isLoading"></loading>
    <h2 class="mb-4 text-center text-md-left">Shopping List</h2>
    <div class="row" v-if="haveItem">
      <div class="col-12 col-lg-8">
        <table class="table table-responsive cartcheckout-custom">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartData" :key="item.id">
              <td>
                <img :src="item.imageUrl" class="img-fluid" alt="image" />
              </td>
              <td>
                <a href="#" @click.prevent="goToItem(item.product_id)">{{ item.name }}</a>
              </td>
              <td>
                <div class="cart-quantity">
                  <select
                    class="form-control form-control-sm"
                    v-model="item.qty"
                    @change="getSubtotal"
                  >
                    <option :value="qty" v-for="qty in 10" :key="qty">{{ qty }}</option>
                  </select>
                  <span class="px-1 d-none d-xl-block">/ {{ item.unit }}</span>
                </div>
              </td>
              <td class="justify-content-end">{{ item.price | currency }}</td>
              <td class="justify-content-end">
                <button
                  type="button"
                  class="trash-btn btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 col-lg-4">
        <div class="cart-summary">
          <h5 class="mb-4">Cart Total</h5>
          <ul class="list-unstyled">
            <li>
              <span>Subtotal:</span>
              <span>{{ subtotal | currency }}</span>
            </li>
            <li class="checkout-btn" @click="postCarts">
              <a class="btn btn-primary btn-lg rounded-0 w-100">Confirm</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row no-product" v-else>
      <div class="col-12 col-lg-11">
        <ul
          class="bg-light d-flex list-unstyled flex-column justify-content-center align-items-center py-5 mb-0"
        >
          <li>
            <i class="fas fa-4x fa-cart-arrow-down"></i>
          </li>
          <li class="no-product-text">Your Shopping List is empty！</li>
          <li>
            <router-link to="/shop/products" class="btn btn-primary">Go Shopping</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cartData: JSON.parse(localStorage.getItem('cartData')) || [],
      isLoading: false,
      cartsLength: '',
      subtotal: 0,
      total: 0,
      index: 0,
      cacheId: [],
      cacheData: [],
      cache: {}
    }
  },
  methods: {
    removeCartItem (item) {
      this.index = this.cartData.indexOf(item)
      this.cartData.splice(this.index, 1)
      localStorage.setItem('cartData', JSON.stringify(this.cartData))
      this.getSubtotal()
      this.$bus.$emit('localStorage:get')
      this.$bus.$emit('message:push', 'Deleted', 'success')
    },
    postCarts () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`)
        .then(response => {
          this.cacheData = response.data.data.carts
          this.cacheData.forEach(item => {
            this.cacheId.push(item.id)
          })
        })
        .then(() => {
          this.cacheId.forEach(item => {
            this.$http.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item}`)
          })
        })
        .then(() => {
          this.cartData.forEach(item => {
            this.cache = {
              product_id: item.product_id,
              qty: item.qty
            }
            this.$http.post(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`, { data: this.cache })
              .then(response => {
                if (response.data.success) {
                  this.cartData = []
                  this.cacheId = []
                  this.cacheData = []
                  this.cache = {}
                  localStorage.removeItem('cartData')
                  this.$bus.$emit('localStorage:get')
                  this.$router.push('/shop/cart').catch(() => { })
                }
                this.isLoading = false
              })
          })
        })
    },
    goToItem (id) {
      this.$router.push(`product_detail/${id}`)
    },
    getSubtotal () {
      if (this.cartData.length > 1) {
        this.subtotal = 0
        this.cartData.forEach(item => {
          this.subtotal += Number(item.price * item.qty)
        })
      } else if (this.cartData.length === 1) {
        this.cartData.forEach(item => {
          this.subtotal = Number(item.price * item.qty)
        })
      } else {
        this.subtotal = 0
      }
    }
  },
  computed: {
    haveItem () {
      if (this.cartData.length === 0) {
        return false
      } else {
        return true
      }
    }
  },
  created () {
    this.$bus.$emit('menu:active', 'CART')
    this.getSubtotal()
  }
}
</script>
<style lang="scss" scope>
.no-product {
  a {
    transition: 0.5s;
  }
  a:hover {
    color: #fff;
    background-color: #000;
    border-color: #000;
  }
}
</style>
