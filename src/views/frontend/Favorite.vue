<template>
  <div class="px-3 py-150 favorite-area">
    <h2 class="mb-4 text-center text-md-left">Favorite</h2>
    <div class="row" v-if="haveItem">
      <div class="col-12 col-lg-10">
        <table class="table table-responsive cart-custom">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in favProducts" :key="item.id">
              <td>
                <img :src="item.imageUrl" class="img-fluid" alt="product_image" />
              </td>
              <td class="product-title">
                <a href="#" @click.prevent="getProductId(item.id)">{{ item.title }}</a>
              </td>
              <td class="justify-content-end">{{ item.price | currency }}</td>
              <td class="justify-content-end">
                <button type="button" class="cart-btn btn btn-sm" @click="addToCart(item)">
                  <div class="cart-icon"></div>
                </button>
                <button
                  type="button"
                  class="trash-btn btn btn-outline-danger btn-sm"
                  @click="removeFromFav(item)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
          <li class="no-product-text">Your Favorite is empty！</li>
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
      haveItem: '',
      cartData: JSON.parse(localStorage.getItem('cartData')) || [], // localStorage的資料
      cacheCarID: [], // 暫存ID放置處
      cartContent: {}, // 新加入的產品
      cache: {}, // 產品暫存處
      qty: 0
    }
  },
  methods: {
    removeFromFav (product) {
      this.$store.dispatch('removeFromFav', product)
      this.favItems()
    },
    favItems () {
      if (this.$store.state.Fav.length) {
        this.haveItem = true
      } else {
        this.haveItem = false
      }
    },
    getProductId (id) {
      this.$router.push(`product_detail/${id}`)
    },
    addToCart (data) {
      // 先撈出cartData裡面的ID存起來
      this.cartData.forEach(item => {
        this.cacheCarID.push(item.product_id)
      })
      // 使用indexOf找傳進來的參數ID是否有在陣列中，沒有則跑if；有跑else
      if (this.cacheCarID.indexOf(data.id) === -1) {
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
        this.$bus.$emit('message:push', 'Add the cart', 'success')
      }
      this.removeFromFav(data)
    }
  },
  computed: {
    favProducts () {
      return this.$store.state.Fav
    }
  },
  created () {
    this.favItems()
  }
}
</script>
