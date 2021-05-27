<template>
  <div class="coupon-area px-3 py-150">
    <h2 class="mb-4 text-center text-md-left">Coupon</h2>
    <div class="row">
      <div class="col-md-12">
        <div class="card-deck">
          <div class="card">
            <img
              src="@/assets/images/custom-img/bed-coupon.jpg"
              class="card-img-top"
              alt="chair-img"
            />
            <div class="card-body">
              <h5 class="card-title">Coupon code</h5>
              <p class="card-text">Welcome to Amado! Use this coupon code will get a 10% Off.</p>
              <p class="card-text">
                <router-link to="/shop/products" class="text-decoration-none">
                  Go Shopping
                  <i class="fas fa-angle-double-right"></i>
                </router-link>
              </p>
            </div>
            <div class="card-footer">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control h-auto"
                  aria-label="Dollar amount (with dot and two decimal places)"
                  disabled
                  v-model="bed_code"
                />
                <div class="input-group-append">
                  <span class="input-group-text px-0 py-0">
                    <button
                      type="button"
                      class="btn btn-sm"
                      v-clipboard="bed_code"
                      v-clipboard:success="clipboardSuccessHandler"
                    >Copy</button>
                  </span>
                </div>
                <div class="coupon-icon ml-2"></div>
              </div>
            </div>
          </div>
          <div class="card">
            <img
              src="@/assets/images/custom-img/chair-coupon.jpg"
              class="card-img-top"
              alt="bed-img"
            />
            <div class="card-body">
              <h5 class="card-title">Coupon code</h5>
              <p class="card-text">Welcome to Amado! Use this coupon code will get a 20% Off.</p>
              <p class="card-text">
                <router-link to="/shop/products" class="text-decoration-none">
                  Go Shopping
                  <i class="fas fa-angle-double-right"></i>
                </router-link>
              </p>
            </div>
            <div class="card-footer">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control h-auto"
                  aria-label="Dollar amount (with dot and two decimal places)"
                  disabled
                  v-model="chair_code"
                />
                <div class="input-group-append">
                  <span class="input-group-text px-0 py-0">
                    <button
                      type="button"
                      class="btn btn-sm"
                      v-clipboard="chair_code"
                      v-clipboard:success="clipboardSuccessHandler"
                    >Copy</button>
                  </span>
                </div>
                <div class="coupon-icon ml-2"></div>
              </div>
            </div>
          </div>
          <div class="card">
            <img
              src="@/assets/images/custom-img/table-coupon.jpg"
              class="card-img-top"
              alt="table-img"
            />
            <div class="card-body">
              <h5 class="card-title">Coupon code</h5>
              <p class="card-text">Welcome to Amado! Use this coupon code will get a 30% Off.</p>
              <p class="card-text">
                <router-link to="/shop/products" class="text-decoration-none">
                  Go Shopping
                  <i class="fas fa-angle-double-right"></i>
                </router-link>
              </p>
            </div>
            <div class="card-footer">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control h-auto"
                  aria-label="Dollar amount (with dot and two decimal places)"
                  disabled
                  v-model="table_code"
                />
                <div class="input-group-append">
                  <span class="input-group-text px-0 py-0">
                    <button
                      type="button"
                      class="btn btn-sm"
                      v-clipboard="table_code"
                      v-clipboard:success="clipboardSuccessHandler"
                    >Copy</button>
                  </span>
                </div>
                <div class="coupon-icon ml-2"></div>
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
      bed_code: 'AMADOSBED520',
      chair_code: 'AMADOSCHAIR520',
      table_code: 'AMADOSTABLE520'
    }
  },
  methods: {
    clipboardSuccessHandler ({ value, event }) {
      this.$bus.$emit('message:push', 'Copied', 'success')
    }
  },
  created () {
    this.$bus.$emit('menu:active', 'COUPONS')
  }
}
</script>
