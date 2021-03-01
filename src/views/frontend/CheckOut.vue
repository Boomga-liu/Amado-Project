<template>
  <div class="px-3 py-150">
    <loading :active.sync="isLoading"></loading>
    <h2 class="mb-4">Checkout</h2>
    <validation-observer v-slot="{ invalid }">
      <form @submit.prevent="createOrder">
        <div class="row">
          <div class="col-12 col-lg-8">
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="name">Name</label>
                <!-- 輸入框 -->
                <input
                  type="name"
                  class="form-control input-custom"
                  :class="classes"
                  v-model="form.user.name"
                  id="name"
                  placeholder="Please Enter Name"
                />
                <!-- 錯誤訊息 -->
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="tel">Tel</label>
                <input
                  type="tel"
                  class="form-control input-custom"
                  :class="classes"
                  v-model="form.user.tel"
                  id="tel"
                  placeholder="Please Enter Tel"
                />
                <span class="invalid-feedback">{{ errors[0] }} </span>
              </div>
            </validation-provider>

            <validation-provider
              rules="required|email"
              v-slot="{ errors, classes }"
            >
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control input-custom"
                  :class="classes"
                  v-model="form.user.email"
                  id="email"
                  placeholder="Please Enter Email"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>

            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="address">Address</label>
                <input
                  type="text"
                  class="form-control input-custom"
                  :class="classes"
                  v-model="form.user.address"
                  id="address"
                  placeholder="Please Enter Address"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
            <div class="form-group">
              <label for="comment">Message</label>
              <textarea
                name=""
                class="form-control input-custom"
                id="comment"
                cols="30"
                rows="10"
                v-model="form.user.message"
              ></textarea>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="cart-summary">
              <h5 class="mb-4">Cart total</h5>
              <ul class="list-unstyled">
                <li>
                  <span>Subtotal: </span
                  ><span>{{ cart.total | currency }} </span>
                </li>
                <li>
                  <span>Total: </span
                  ><span>{{ cart.final_total | currency }} </span>
                </li>
              </ul>
              <div class="payment-term mt-4">
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="Radios"
                    id="CashOnDelivery"
                    value="option1"
                    checked
                  />
                  <label class="form-check-label" for="CashOnDelivery">
                    Cash on Delivery
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="Radios"
                    id="CreditCard"
                    value="option2"
                  />
                  <label class="form-check-label" for="CreditCard">
                    Paypal
                    <img
                      class="ml-2"
                      src="../../assets/images/core-img/paypal.png"
                      alt=""
                    />
                  </label>
                </div>
              </div>
              <div class="checkout-btn">
                <button
                  class="btn btn-primary rounded-0 btn-lg w-100"
                  :disabled="invalid"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </validation-observer>

    <!-- Modal -->
    <div
      class="modal fade"
      id="emptyModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">{{ message }}</div>
          <div class="modal-footer">
            <router-link
              class="btn btn-primary text-white"
              data-dismiss="modal"
              to="/shop"
              >Go Shopping</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  data() {
    return {
      isLoading: '',
      cart: {
        carts: [],
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          message: '',
        },
      },
      message: '',
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          vm.cart = response.data.data;
          vm.isLoading = false;
        }
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.isLoading = true;
      this.$http.post(url, { data: order }).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          vm.$router.push(`orders/${response.data.orderId}`);
        } else {
          vm.message = response.data.message;
          $('#emptyModal').modal('show');
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getCart();
    this.$bus.$emit('menu:active', 'CHECKOUT');
  },
};
</script>
