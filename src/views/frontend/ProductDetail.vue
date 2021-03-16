<template>
  <div class="product-detail py-150 py-100 px-15 px-3">
    <div class="row">
      <div class="col-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-white px-0">
            <li class="breadcrumb-item">
              <a href="#" @click.prevent="backHome">HOME</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#" @click.prevent="back">SHOP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ product.title | capitalize }}</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row">
      <loading :active.sync="isLoading"></loading>
      <div class="col-12 col-lg-7">
        <img :src="product.imageUrl" class="img-fluid" alt="image" />
      </div>
      <div class="col-12 col-lg-5 mt-5 mt-lg-0">
        <div class="product-data mb-50">
          <div class="line"></div>
          <del class="h6 text-muted">NT {{ product.origin_price | currency }}</del>
          <p class="h5 product-price">NT {{ product.price | currency }}</p>
          <h6 class="product-title">{{ product.title }}</h6>
          <div class="star">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
        </div>
        <div class="product-content mb-50">
          <p class="h6 mb-1 text-muted">Content:</p>
          <p class="p-2 text-muted">{{ product.content }}</p>
        </div>
        <div class="product-addtocart">
          <div class="quantity-fav d-flex align-items-center justify-content-between">
            <div class="quantity">
              <p>Qty</p>
              <input class="qty-text" type="number" step="1" :value="Qty.value" />
              <span class="caret-up" @click="addQty">
                <i class="fa fa-caret-up" aria-hidden="true"></i>
              </span>
              <span class="caret-down" @click="lessQty">
                <i class="fa fa-caret-down" aria-hidden="true"></i>
              </span>
            </div>
            <button
              class="fav-btn btn btn-light ml-180 h-100"
              v-if="isFav"
              @click.prevent="addToFav(product)"
            >
              <i class="far fa-star"></i>
            </button>
            <button
              class="fav-btn btn btn-light ml-180 h-100"
              v-else
              @click.prevent="removeFromFav(product)"
            >
              <i class="fas fa-star"></i>
            </button>
          </div>
          <!-- <select class="form-control w-50 mb-5" v-model="product.num">
            <option :value="num" v-for="num in 10" :key="num">
              {{ num }} {{ product.unit }}
            </option>
          </select>-->
          <button
            class="btn btn-primary btn-lg text-white mt-5"
            @click="addToCart(product.id, product.num)"
          >
            <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data () {
    return {
      productId: '',
      product: {},
      status: {
        loadingItem: ''
      },
      Qty: {
        value: 1
      }
    }
  },
  methods: {
    getProduct (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.$store.dispatch('updateLoading', true)
      this.$http.get(url).then(response => {
        // console.log(response.data);
        if (response.data.success) {
          vm.product = response.data.product
          vm.product.num = 1
        }
        vm.$store.dispatch('updateLoading', false)
      })
    },
    addToCart (id, qty = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart }).then(response => {
        // console.log(response.data);
        vm.status.loadingItem = ''
        // 把事件$emit出去(後面可帶參數)
        vm.$bus.$emit('cart:get')
      })
    },
    addToFav (product) {
      this.$store.dispatch('addToFav', product)
      // console.log(this.$store.state.Fav)
    },
    removeFromFav (product) {
      this.$store.dispatch('removeFromFav', product)
    },
    addQty () {
      const vm = this
      if (vm.Qty.value >= 10) {
        return
      }
      vm.Qty.value = vm.Qty.value + 1
      vm.product.num = vm.Qty.value
    },
    lessQty () {
      const vm = this
      if (vm.Qty.value <= 1) {
        return
      }
      vm.Qty.value = vm.Qty.value - 1
      vm.product.num = vm.Qty.value
    },
    back () {
      this.$router.go(-1)
    },
    backHome () {
      this.$router.push('/')
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    isFav () {
      return this.$store.state.isFav
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase()
    }
  },
  created () {
    this.productId = this.$route.params.productId // 從網址取得參數
    this.getProduct(this.productId)
    this.$bus.$emit('menu:active', 'SHOP')
    this.$store.dispatch('getFavId', this.productId)
  }
}
</script>
