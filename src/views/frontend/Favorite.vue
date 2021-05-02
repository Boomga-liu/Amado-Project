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
            <tr v-for="item in favProducts" :key="item.id" class>
              <td>
                <img :src="item.imageUrl" class="img-fluid" alt="image" />
              </td>
              <td class="product-title">
                <a href="#" @click.prevent="getProductId(item.id)">{{ item.title }}</a>
              </td>
              <td class="justify-content-end">{{ item.price | currency }}</td>
              <td class="justify-content-end">
                <button type="button" class="cart-btn btn btn-sm" @click.prevent="addToCart(item)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  <div class="cart-icon"></div>
                </button>
                <button
                  type="button"
                  class="trash-btn btn btn-outline-danger btn-sm"
                  @click.prevent="removeFromFav(item)"
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
      status: {
        loadingItem: ''
      }
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
    addToCart (item, qty = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.status.loadingItem = item.id
      const cart = {
        product_id: item.id,
        qty
      }
      vm.$http.post(url, { data: cart }).then(response => {
        if (response.data.success) {
          vm.$bus.$emit('cart:get')
          vm.removeFromFav(item)
          vm.status.loadingItem = ''
        }
      })
    }
  },
  computed: {
    favProducts () {
      return this.$store.state.Fav
    }
  },
  created () {
    this.favItems()
    // console.log(this.favProducts)
  }
}
</script>
