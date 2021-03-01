<template>
  <div>
    <table class="table table-responsive-sm mt-4">
      <thead>
        <tr>
          <th width="150">購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th width="120">應付金額</th>
          <th width="120">是否付款</th>
        </tr>
      </thead>
      <tbody v-for="item in orders" :key="item.id">
        <tr>
          <td>{{ item.create_at }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="product in item.products" :key="product.id">
                {{ product.product.title }} 數量 : {{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td class="text-success" v-if="item.is_paid">已付款</td>
          <td class="text-muted" v-else>尚未付款</td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" :emit-page="getOrders" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  data () {
    return {
      orders: {},
      pagination: {}
    }
  },
  components: {
    Pagination
  },
  methods: {
    getOrders (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      const vm = this
      this.$http.get(api).then(response => {
        // console.log(response.data);
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
        vm.orders.forEach(item => {
          if (item.create_at) {
            const dates = new Date(item.create_at * 1000)
            const year = dates.getFullYear()
            const month = dates.getMonth() + 1
            const date = dates.getDate()
            item.create_at = `${year} / ${month} / ${date}`
          } else {
          }
        })
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
