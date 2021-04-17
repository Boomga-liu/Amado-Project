<template>
  <div class="px-3 py-150">
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
            <tr v-for="item in cart.carts" :key="item.id" class>
              <td>
                <img :src="item.product.imageUrl" class="img-fluid" alt="image" />
              </td>
              <td>{{ item.product.title }}</td>
              <td>
                <div class="bg-color">{{ item.qty }} / {{ item.product.unit }}</div>
              </td>
              <td class="justify-content-end">{{ item.final_total | currency }}</td>
              <td class="justify-content-end">
                <button
                  class="trash-btn btn btn-outline-danger btn-sm"
                  @click.prevent="removeCartItem(item.id)"
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
              <span>{{ cart.total | currency }}</span>
            </li>
            <li>
              <span>Total:</span>
              <span>{{ cart.final_total | currency }}</span>
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
    <div class="row no-product" v-else-if="!haveItem">
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
      isLoading: '',
      cartsLength: '',
      haveItem: true
    }
  },
  methods: {
    getCart () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.cart = response.data.data
          vm.cartsLength = response.data.data.carts.length
          vm.cartsItem()
          vm.isLoading = false
        }
      })
    },
    removeCartItem (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      this.$http.delete(url).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
          vm.getCart()
          vm.$bus.$emit('cart:get')
          vm.$bus.$emit('message:push', `商品${response.data.message}`, 'success')
        }
      })
    },
    cartsItem () {
      if (this.cartsLength) {
        this.haveItem = true
      } else {
        this.haveItem = false
      }
    }
  },
  created () {
    this.getCart()
    this.$bus.$emit('menu:active', 'CART')
  }
}
</script>
