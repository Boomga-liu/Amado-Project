<template>
  <div class="px-3 py-150">
    <loading :active.sync="isLoading"></loading>
    <form @submit="payOrder">
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
                  <img
                    :src="item.product.imageUrl"
                    class="img-fluid"
                    alt="image"
                  />
                </td>
                <td>{{ item.product.title }}</td>
                <td>
                  <div class="bg-color">
                    {{ item.qty }} / {{ item.product.unit }}
                  </div>
                </td>
                <td class="justify-content-end">
                  {{ item.final_total | currency }}
                </td>
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
            <tbody class="">
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
                  <span v-if="!order.is_paid" class="text-danger"
                    >non-payment</span
                  >
                  <span v-else class="text-success">paid</span>
                </td>
              </tr>
            </tbody>
            <div class="mt-5" v-if="!order.is_paid">
              <button class="btn btn-danger">Pay</button>
            </div>
            <div class="mt-5" v-else>
              <router-link class="btn btn-primary text-white" to="/"
                >Home</router-link
              >
            </div>
          </table>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: '',
      isLoading: '',
      chevronUp: true,
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          vm.order = response.data.order;
          vm.isLoading = false;
        }
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('cart:get');
          vm.getOrder();
        }
        vm.isLoading = false;
      });
    },
    toggleActive() {
      if (this.chevronUp) {
        $('#collapseArea').collapse('toggle');
        this.chevronUp = false;
      } else {
        $('#collapseArea').collapse('toggle');
        this.chevronUp = true;
      }
    },
  },
  created() {
    this.orderId = this.$route.params.orderId; // 從網址取得參數
    this.getOrder();
  },
};
</script>
