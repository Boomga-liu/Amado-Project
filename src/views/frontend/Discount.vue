<template>
  <div class="discount-area px-3 py-150">
    <h2 class="mb-4 text-center text-md-left">Discount</h2>
    <div class="row">
      <div class="col-md-12">
        <div class="card-deck">
          <div class="card">
            <img
              src="../../assets/images/custom-img/bed-discount.jpg"
              class="card-img-top"
              alt="chair-img"
            />
            <div class="card-body">
              <h5 class="card-title">Discount code</h5>
              <p
                class="card-text"
              >Welcome to Amado! Use this discount code will get a 10 percent discount on bed products.</p>
              <p class="card-text">
                <router-link to="/shop" class="text-decoration-none">
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
                <div class="discount-icon ml-2"></div>
              </div>
            </div>
          </div>
          <div class="card">
            <img
              src="../../assets/images/custom-img/chair-discount.jpg"
              class="card-img-top"
              alt="bed-img"
            />
            <div class="card-body">
              <h5 class="card-title">Discount code</h5>
              <p
                class="card-text"
              >Welcome to Amado! Use this discount code will get a 10 percent discount on chair products.</p>
              <p class="card-text">
                <router-link to="/shop" class="text-decoration-none">
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
                <div class="discount-icon ml-2"></div>
              </div>
            </div>
          </div>
          <div class="card">
            <img
              src="../../assets/images/custom-img/table-discount.jpg"
              class="card-img-top"
              alt="table-img"
            />
            <div class="card-body">
              <h5 class="card-title">Discount code</h5>
              <p
                class="card-text"
              >Welcome to Amado! Use this discount code will get a 10 percent discount on table products.</p>
              <p class="card-text">
                <router-link to="/shop" class="text-decoration-none">
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
                <div class="discount-icon ml-2"></div>
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
  created () {
    this.$bus.$emit('menu:active', 'DISCOUNT')
  }
}
</script>
