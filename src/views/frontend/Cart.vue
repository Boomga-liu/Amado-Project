<template>
  <div class="px-3 py-150 cart-area">
    <loading :active.sync="isLoading"></loading>
    <h2 class="mb-4 text-center text-md-left">Shopping Cart</h2>
    <div class="row" v-if="haveItem">
      <div class="col-12 col-lg-8">
        <table class="table table-responsive cart-custom">
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
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <img :src="item.product.imageUrl" class="img-fluid" alt="image" />
              </td>
              <td class="d-block">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">Coupon used</div>
              </td>
              <td>
                <div class="cart-quantity">
                  <select
                    class="form-control form-control-sm"
                    v-model="item.qty"
                    @change="changeQty(item)"
                  >
                    <option :value="qty" v-for="qty in 10" :key="qty">{{ qty }}</option>
                  </select>
                  <span class="px-1 d-none d-xl-block">/ {{ item.product.unit }}</span>
                </div>
              </td>
              <td
                class="justify-content-end"
                v-if="item.total !== item.final_total"
              >{{ item.final_total | currency }}</td>
              <td class="justify-content-end" v-else>{{ item.total | currency }}</td>
              <td class="justify-content-end">
                <button
                  type="button"
                  class="trash-btn btn btn-outline-danger btn-sm"
                  @click.prevent="removeCartItem(item.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            <div class="coupon-code input-group mt-4">
              <input
                class="form-control"
                type="text"
                placeholder="Coupon Code"
                v-model="couponCode"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="addCouponCode">Use Coupon Code</button>
              </div>
            </div>
          </tbody>
        </table>
      </div>
      <div class="col-12 col-lg-4">
        <div class="cart-summary">
          <h5 class="mb-4">Cart Total</h5>
          <ul class="list-unstyled">
            <li>
              <span>Subtotal:</span>
              <span>{{ cart.total | currency }}</span>
            </li>
            <li v-if="cart.total !== cart.final_total">
              <span class="text-success">Discount Total:</span>
              <span class="text-success">{{ cart.final_total | currency }}</span>
            </li>
            <li class="checkout-btn">
              <router-link
                to="/shop/checkout"
                class="btn btn-primary btn-lg rounded-0 w-100"
              >Checkout</router-link>
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
          <li class="no-product-text">Your Shopping Cart is empty！</li>
          <li>
            <router-link to="/shop/products" class="btn btn-primary text-white">Go Shopping</router-link>
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
      cart: {
        carts: []
      },
      isLoading: false,
      cartsLength: '',
      subtotal: 0,
      total: 0,
      index: 0,
      cache: {},
      coupon: {},
      couponCode: ''
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(url).then(response => {
        if (response.data.success) {
          this.cart = response.data.data
        }
        vm.isLoading = false
      })
    },
    removeCartItem (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      vm.$http.delete(url).then(response => {
        if (response.data.success) {
          vm.getProducts()
          vm.isLoading = false
          vm.$bus.$emit('message:push', 'Deleted', 'success')
        }
      })
    },
    changeQty (item) {
      this.isLoading = true
      this.cache = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`)
        .then(() => {
        })
        .then(() => {
          this.$http.post(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`, { data: this.cache })
            .then(response => {
              this.getProducts()
              this.isLoading = false
            })
        })
    },
    addCouponCode () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      this.coupon = {
        code: this.couponCode
      }
      this.$http.post(url, { data: this.coupon }).then(response => {
        if (response.data.success) {
          this.getProducts()
          this.couponCode = ''
          this.isLoading = false
        }
      })
    }
  },
  computed: {
    haveItem () {
      if (this.cart.carts.length === 0) {
        return false
      } else {
        return true
      }
    }
  },
  created () {
    this.$bus.$emit('menu:active', 'CART')
    this.getProducts()
  }
}
</script>
