<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="d-flex flex-column-reverse flex-md-row">
      <div class="shop-sidebar-area">
        <div class="shop-sidebar h-100">
          <div class="shop-catagories">
            <h6>Catagories</h6>
            <ul class="list-unstyled">
              <li>
                <a
                  href="#"
                  @click.prevent="changeTab('All')"
                  :class="{ active: isChoose === 'All' }"
                >All</a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="changeTab('Chairs')"
                  :class="{ active: isChoose === 'Chairs' }"
                >Chairs</a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="changeTab('Beds')"
                  :class="{ active: isChoose === 'Beds' }"
                >Beds</a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="changeTab('Pillows')"
                  :class="{ active: isChoose === 'Pillows' }"
                >Pillows</a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="changeTab('Sofas')"
                  :class="{ active: isChoose === 'Sofas' }"
                >Sofas</a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="changeTab('Home Deco')"
                  :class="{ active: isChoose === 'Home Deco' }"
                >Home Deco</a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="changeTab('Tables')"
                  :class="{ active: isChoose === 'Tables' }"
                >Tables</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="shop-products-area">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="search-area input-group mb-3">
                <button
                  type="button"
                  class="btn input-group-prepend align-items-center"
                  @click="searchProduct"
                >
                  <div class="search-img"></div>
                </button>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search"
                  v-model.trim="search"
                  @input="searchProduct"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div
              class="col-12 col-sm-6 col-md-12 col-xl-6 mt-5 shop-products"
              data-aos="fade-up"
              data-aos-duration="1000"
              v-for="item in filterPage"
              :key="item.id"
            >
              <div class="card">
                <a href="#">
                  <img
                    :src="item.imageUrl"
                    class="card-img-top img-custom"
                    style="height:465px;"
                    alt="product_img"
                  />
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
                      <a href="#" @click.prevent="addToCart(item)">
                        <div class="cart-icon"></div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="(search || searchResult.length) && searchResult.length == 0">
            <div class="col-12">
              <div class="no-results-area">
                <p>No results related to '{{ search }}'</p>
              </div>
            </div>
          </div>
          <Pagination
            :pages="pagination"
            @emit-page="getPage"
            class="mt-5"
            v-if="pagination.total_pages"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Products',
  data () {
    return {
      isChoose: 'All',
      isLoading: false,
      products: [],
      product: {
        id: ''
      },
      pagination: {
        page_size: 6,
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false
      },
      search: '',
      searchResult: [],
      data_length: '',
      page_size: '',
      now_page: '',
      cartData: JSON.parse(localStorage.getItem('cartData')) || [], // localStorage的資料
      cacheCarID: [], // 暫存ID放置處
      cartContent: {}, // 新加入的產品
      cache: {}, // 產品暫存處
      qty: 0
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProducts () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      vm.$http.get(url).then(response => {
        if (response.data.success) {
          vm.products = response.data.products
        }
        vm.isLoading = false
      })
    },
    getPage (page = 1) {
      const vm = this
      vm.pagination.current_page = page
    },
    getProductId (id) {
      this.$router.push(`product_detail/${id}`)
    },
    changeTab (category) {
      const vm = this
      vm.isChoose = category
      vm.pagination.current_page = 1
    },
    searchProduct () {
      const vm = this
      vm.pagination.current_page = 1
      if (vm.search) {
        vm.isChoose = vm.search
        vm.searchResult = vm.products.filter(item =>
          item.category === vm.search
        )
      } else {
        vm.searchResult = []
      }
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
            // 移除現有localStorage購物車的資料，否則localStorage會重複加入
            this.cartData.splice(keys, 1)
          }
        })
        this.cartData.push(this.cache)
        localStorage.setItem('cartData', JSON.stringify(this.cartData))
        this.$bus.$emit('message:push', 'Add the cart', 'success')
      }
    }
  },
  computed: {
    filterData () {
      const vm = this
      if (vm.search || vm.searchResult.length) {
        return vm.searchResult
      } else if (vm.isChoose === 'All') {
        return vm.products
      } else {
        return vm.products.filter(item =>
          item.category === vm.isChoose
        )
      }
    },
    filterPage () {
      const vm = this
      vm.data_length = vm.filterData.length
      vm.page_size = vm.pagination.page_size
      vm.pagination.total_pages = Math.ceil(vm.data_length / vm.page_size)
      vm.now_page = vm.pagination.current_page
      if (vm.now_page > 1) {
        vm.pagination.has_pre = true
      } else {
        vm.pagination.has_pre = false
      }
      if (vm.now_page < vm.pagination.total_pages) {
        vm.pagination.has_next = true
      } else {
        vm.pagination.has_next = false
      }

      return vm.filterData.filter((item, index) => {
        return (
          index < vm.now_page * vm.page_size &&
          index >= (vm.now_page - 1) * vm.page_size
          // 回傳 索引<當前頁數*一頁顯示的數量 而且 索引>=(當前頁數-1)*一頁顯示的數量
        )
      })
    }
  },
  created () {
    this.getProducts()
    this.$bus.$emit('menu:active', 'PRODUCTS')
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'ProductDetail') {
      from.meta.keepAlive = true
      next()
    } else {
      from.meta.keepAlive = false
      this.$destroy()
      next()
    }
  }
}
</script>
