<template>
  <div class="px-3 py-150">
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
              <td>{{ item.title }}</td>
              <td class="justify-content-end">{{ item.price | currency }}</td>
              <td class="justify-content-end">
                <button
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
            <router-link to="/shop" class="btn btn-primary text-white">Go Shopping</router-link>
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
      haveItem: ''
    }
  },
  methods: {
    removeFromFav (product) {
      this.$store.dispatch('removeFromFav', product)
      this.haveItem = false
    },
    favItems () {
      if (this.$store.state.Fav.length) {
        this.haveItem = true
      } else {
        this.haveItem = false
      }
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
