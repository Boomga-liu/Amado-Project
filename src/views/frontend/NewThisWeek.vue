<template>
  <div class="newthisweek-area px-3 py-150">
    <loading :active.sync="isLoading"></loading>
    <h2 class="mb-4 text-center text-md-left">New This Week</h2>
    <div class="row">
      <div class="col-12 col-xl-4 mb-5" v-for="item in products" :key="item.id">
        <div class="card h-100">
          <a href="#">
            <img :src="item.imageUrl" class="card-img-top img-fluid" alt="images" />
            <div class="btn-bg" @click="getProductId(item.id)">
              <button class="btn btn-outline-primary btn-lg btn-custom">More</button>
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
                <a href="#" class="d-flex align-items-center justify-content-sm-end">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  <div class="cart-icon" @click.prevent="addToCart(item.id)"></div>
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
      }
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      this.$http.get(url).then(response => {
        if (response.data.success) {
          // console.log(response.data)
          vm.products = response.data.products.filter(function (item, index) {
            return index % 2 === 1
            // console.log(index, (index % 2 === 0))
          })
          vm.isLoading = false
        }
      })
    },
    addToCart (id, qty = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      vm.status.loadingItem = id
      this.$http.post(url, { data: cart }).then(response => {
        // console.log(response.data)
        vm.$bus.$emit('cart:get')
        vm.status.loadingItem = ''
      })
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
