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
                  @click.prevent="changeTab('Accessories')"
                  :class="{ active: isChoose === 'Accessories' }"
                >Accessories</a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="changeTab('Furniture')"
                  :class="{ active: isChoose === 'Furniture' }"
                >Furniture</a>
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
          <div class="shop-brands">
            <h6>Brands</h6>
            <div class="brands-checkbox">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Amado" id="Amado" />
                <label class="form-check-label" for="Amado">Amado</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Ikea" id="Ikea" />
                <label class="form-check-label" for="Ikea">Ikea</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="Furniture Inc"
                  id="Furniture Inc"
                />
                <label class="form-check-label" for="Furniture Inc">Furniture Inc</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="The factory"
                  id="The factory"
                />
                <label class="form-check-label" for="The factory">The factory</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Artdeco" id="Artdeco" />
                <label class="form-check-label" for="Artdeco">Artdeco</label>
              </div>
            </div>
          </div>
          <div class="shop-color">
            <h6>Color</h6>
            <ul class="list-unstyled d-flex flex-wrap">
              <li>
                <a href="#" class="white"></a>
              </li>
              <li>
                <a href="#" class="dark-gray"></a>
              </li>
              <li>
                <a href="#" class="black"></a>
              </li>
              <li>
                <a href="#" class="blue"></a>
              </li>
              <li>
                <a href="#" class="red"></a>
              </li>
              <li>
                <a href="#" class="yellow"></a>
              </li>
              <li>
                <a href="#" class="dark-orange"></a>
              </li>
              <li>
                <a href="#" class="brown"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="shop-products-area">
        <div class="container-fluid shop-products">
          <div class="row">
            <div
              class="col-12 col-sm-6 col-md-12 col-xl-6 mt-5 px-custom"
              data-aos="fade-up"
              data-aos-duration="1000"
              v-for="item in filterPage"
              :key="item.id"
            >
              <div class="card">
                <a href="#">
                  <img :src="item.imageUrl" class="card-img-top" style="height:465px;" />
                  <div class="btn-bg" @click.prevent="getProductId(item.id)">
                    <button class="btn btn-outline-primary btn-lg btn-custom">More</button>
                  </div>
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
import Pagination from '@/components/Pagination'

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
      data_length: '',
      page_size: '',
      now_page: '',
      status: {
        loadingItem: ''
      }
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
      this.$http.get(url).then(response => {
        // console.log(response.data);
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
        if (response.data.success) {
          vm.status.loadingItem = ''
          vm.$bus.$emit('cart:get')
        }
      })
    }
  },
  computed: {
    filterData () {
      const vm = this
      if (vm.isChoose === 'All') {
        return vm.products
      } else {
        return vm.products.filter(item => {
          return item.category === vm.isChoose
        })
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
    this.$bus.$emit('menu:active', 'SHOP')
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
