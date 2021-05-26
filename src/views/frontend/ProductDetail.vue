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
      <div class="col-12 col-lg-7 pr-2">
        <img :src="product.imageUrl" class="img-fluid" alt="image" />
      </div>
      <div class="col-12 col-lg-5 mt-5 mt-lg-0 pl-2">
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
          <p class="h6 mb-1 text-muted">Description:</p>
          <p class="p-2 text-muted">{{ product.description }}</p>
        </div>
        <div class="product-addtocart">
          <div class="quantity-fav d-flex align-items-center justify-content-between">
            <div class="quantity">
              <p>Qty</p>
              <input
                class="qty-text"
                type="number"
                step="1"
                min="1"
                max="10"
                v-model.number="Qty.value"
                @input="checkQty"
              />
              <span class="caret-up" @click="addQty">
                <i class="fa fa-caret-up" aria-hidden="true"></i>
              </span>
              <span class="caret-down" @click="lessQty">
                <i class="fa fa-caret-down" aria-hidden="true"></i>
              </span>
            </div>
            <button
              type="button"
              class="fav-btn btn btn-light ml-180 h-100"
              v-if="isFav"
              @click="addToFav(product)"
            >
              <i class="far fa-star"></i>
            </button>
            <button
              type="button"
              class="fav-btn btn btn-light ml-180 h-100"
              v-else
              @click="removeFromFav(product)"
            >
              <i class="fas fa-star"></i>
            </button>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-lg mt-5 add-btn"
            @click="addToCart(product.id)"
          >Add to cart</button>
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
      isLoading: false,
      Qty: {
        value: 1
      },
      cartData: JSON.parse(localStorage.getItem('cartData')) || [], // localStorage的資料
      cacheCarID: [], // 暫存ID放置處
      cartContent: {}, // 新加入的產品
      cache: {} // 產品暫存處
    }
  },
  methods: {
    getProduct (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.isLoading = true
      vm.$http.get(url).then(response => {
        if (response.data.success) {
          vm.product = response.data.product
          vm.product.num = 1
        }
        vm.isLoading = false
      })
    },
    addToCart (id) {
      // 先撈出cartData裡面的ID存起來
      this.cartData.forEach(item => {
        this.cacheCarID.push(item.product_id)
      })
      if (this.Qty.value > 0 && this.Qty.value <= 10) {
        // 使用indexOf找傳進來的參數ID是否有在陣列中，有則跑if；沒有跑else
        if (this.cacheCarID.indexOf(id) === -1) {
          this.cartContent = {
            imageUrl: this.product.imageUrl,
            product_id: this.product.id,
            qty: this.Qty.value,
            name: this.product.title,
            origin_price: this.product.origin_price,
            price: this.product.price,
            unit: this.product.unit
          }
          this.cartData.push(this.cartContent)
          localStorage.setItem('cartData', JSON.stringify(this.cartData))
          this.$bus.$emit('localStorage:get')
          this.$bus.$emit('message:push', 'Add the cart', 'success')
        } else {
          this.cartData.forEach((item, keys) => {
            if (item.product_id === this.product.id) {
              this.cache = {
                imageUrl: this.product.imageUrl,
                product_id: this.product.id,
                qty: this.Qty.value += 1,
                name: this.product.title,
                origin_price: this.product.origin_price,
                price: this.product.price,
                unit: this.product.unit
              }
              this.cartData.splice(keys, 1)
            }
          })
          this.cartData.push(this.cache)
          localStorage.setItem('cartData', JSON.stringify(this.cartData))
          this.$bus.$emit('message:push', 'Add the cart', 'success')
        }
      } else {
        this.$bus.$emit('message:push', 'Quantity is error', 'danger')
      }
    },
    addToFav (product) {
      this.$store.dispatch('addToFav', product)
    },
    removeFromFav (product) {
      this.$store.dispatch('removeFromFav', product)
    },
    addQty () {
      if (this.Qty.value >= 10) {
        return
      }
      this.Qty.value = this.Qty.value + 1
    },
    lessQty () {
      if (this.Qty.value <= 1) {
        return
      }
      this.Qty.value = this.Qty.value - 1
    },
    checkQty () {
      if (this.Qty.value > 10) {
        this.$bus.$emit('message:push', 'No more then 10', 'danger')
      } else if (this.Qty.value === '') {
        this.$bus.$emit('message:push', 'Qty is empty', 'danger')
      } else if (this.Qty.value < 0) {
        this.$bus.$emit('message:push', 'No less then 0', 'danger')
      }
    },
    back () {
      this.$router.push('/shop/products')
    },
    backHome () {
      this.$router.push('/shop')
    }
  },
  computed: {
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
