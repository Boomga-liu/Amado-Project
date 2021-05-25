<template>
  <div class="newthisweek-area px-3 py-150">
    <loading :active.sync="isLoading"></loading>
    <h2 class="mb-4 text-center text-md-left">New This Week</h2>
    <div class="row">
      <div class="col-12 col-xl-4 mb-5" v-for="item in products" :key="item.id">
        <div class="card h-100">
          <a href="#">
            <img :src="item.imageUrl" class="card-img-top img-fluid" alt="image" />
            <div class="btn-bg" @click="getProductId(item.id)">
              <button type="button" class="btn btn-outline-primary btn-lg btn-custom">More</button>
            </div>
            <div class="new-icon"></div>
          </a>
          <div class="card-body d-flex justify-content-between">
            <div class="card-price-name">
              <div class="line"></div>
              <p class="price">NT {{ item.price | currency }}</p>
              <h6 class="title">
                <a href="#" class="text-dark">{{ item.title }}</a>
              </h6>
            </div>
            <div class="cart-star-shopcart text-right">
              <div class="star">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
              </div>
              <div class="shopcart">
                <a
                  href="#"
                  class="d-flex align-items-center justify-content-sm-end"
                  @click.prevent="addToCart(item)"
                >
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  <div class="cart-icon"></div>
                </a>
              </div>
            </div>
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
      products: [],
      isLoading: false,
      status: {
        loadingItem: ''
      },
      cartData: JSON.parse(localStorage.getItem('cartData')) || [],
      cachCarID: [],
      cartContent: {},
      cache: {},
      qty: 0
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      vm.$http.get(url).then(response => {
        if (response.data.success) {
          vm.products = response.data.products.filter(function (item, index) {
            return index % 2 === 1
          })
          vm.isLoading = false
        }
      })
    },
    addToCart (data, qty = 1) {
      this.cartData.forEach(item => {
        this.cachCarID.push(item.product_id)
      })
      if (this.cachCarID.indexOf(data.id) === -1) {
        this.cartContent = {
          imageUrl: data.imageUrl,
          product_id: data.id,
          qty: 1,
          name: data.title,
          origin_price: data.origin_price,
          price: data.price,
          unit: data.unit
        }
        this.cartData.push(this.cartContent)
        localStorage.setItem('cartData', JSON.stringify(this.cartData))
        this.$bus.$emit('localStorage:get')
        this.$bus.$emit('message:push', 'Add The Cart', 'success')
      } else {
        this.cartData.forEach((item, keys) => {
          if (item.product_id === data.id) {
            this.qty = item.qty
            this.cache = {
              imageUrl: data.imageUrl,
              product_id: data.id,
              qty: this.qty += 1,
              name: data.title,
              origin_price: data.origin_price,
              price: data.price,
              unit: data.unit
            }
            this.cartData.splice(keys, 1)
          }
        })
        this.cartData.push(this.cache)
        localStorage.setItem('cartData', JSON.stringify(this.cartData))
        this.$bus.$emit('message:push', 'Add The Cart', 'success')
      }
    },
    getProductId (id) {
      this.$router.push(`product_detail/${id}`)
    }
  },
  created () {
    this.getProducts()
    this.$bus.$emit('menu:active', 'NEWTHISWEEK')
  }
}
</script>
