<template>
  <div class="px-3 py-150">
    <loading :active.sync="isLoading"></loading>
    <form @submit.prevent="payOrder">
      <div class="row">
        <div class="col-12">
          <table class="table table-responsive cart-custom orders-custom">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody class="collapse show" id="collapseArea">
              <tr v-for="item in order.products" :key="item.id">
                <td>
                  <img :src="item.product.imageUrl" class="img-fluid" alt="image" />
                </td>
                <td>{{ item.product.title }}</td>
                <td class="justify-content-end">
                  <div class="bg-color">{{ item.qty }} / {{ item.product.unit }}</div>
                </td>
                <td class="justify-content-end">{{ item.final_total | currency }}</td>
              </tr>
            </tbody>
            <div class="down-icon" @click.prevent="toggleActive">
              <i class="fas fa-2x fa-chevron-up" v-if="chevronUp"></i>
              <i class="fas fa-2x fa-chevron-down" v-else></i>
            </div>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <table class="table table-responsive order-data">
            <tbody class>
              <tr>
                <th width="250">E-mail:</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>Name:</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>Tel:</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>Paid:</th>
                <td>
                  <span v-if="!order.is_paid" class="text-danger">non-payment</span>
                  <span v-else class="text-success">paid</span>
                </td>
              </tr>
            </tbody>
            <div class="mt-5" v-if="!order.is_paid">
              <button type="submit" class="btn btn-danger">Pay</button>
            </div>
            <div class="mt-5" v-else>
              <router-link class="btn btn-primary" to="/shop">Home</router-link>
            </div>
          </table>
        </div>
      </div>
    </form>
    <!-- Modal -->
    <div class="modal fade" id="completeModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Paid</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center order-custom">
            <p>
              <i class="fas fa-3x fa-truck"></i>
            </p>
            <p>Thank you for our products!</p>
            <p>The goods will arrive in 3~5 days, please wait patiently.</p>
          </div>
          <div class="modal-footer">
            <router-link class="btn btn-outline-dark" data-dismiss="modal" to="/shop">Home</router-link>
            <router-link
              class="btn btn-primary"
              data-dismiss="modal"
              to="/shop/products"
            >Go Shopping</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
      isLoading: '',
      chevronUp: true
    }
  },
  methods: {
    getOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.order = response.data.order
          vm.isLoading = false
        }
      })
    },
    payOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.isLoading = true
      this.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.getOrder()
          vm.isLoading = false
          $('#completeModal').modal('show')
        }
      })
    },
    toggleActive () {
      if (this.chevronUp) {
        $('#collapseArea').collapse('toggle')
        this.chevronUp = false
      } else {
        $('#collapseArea').collapse('toggle')
        this.chevronUp = true
      }
    }
  },
  created () {
    this.orderId = this.$route.params.orderId // 從網址取得參數
    this.getOrder()
  }
}
</script>
