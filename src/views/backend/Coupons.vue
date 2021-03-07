<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button @click="openModal(true)" class="btn btn-primary btn-sm">建立新的優惠券</button>
    </div>
    <table class="table table-responsive-sm mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th width="200">折扣百分比</th>
          <th width="200">到期日</th>
          <th width="170">是否啟用</th>
          <th width="130">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.due_date }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary mr-sm-2 btn-sm"
              @click="openModal(false, false, item)"
            >編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openModal(false, true, item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emit-page="getCoupons" />
    <!-- Modal -->
    <div
      class="modal fade"
      id="couponsModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                aria-describedby="emailHelp"
                v-model="tempCoupon.title"
              />
            </div>
            <div class="form-group">
              <label for="couponsCode">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="couponsCode"
                aria-describedby="emailHelp"
                v-model="tempCoupon.code"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                type="text"
                class="form-control"
                id="due_date"
                aria-describedby="emailHelp"
                v-model="tempCoupon.due_date"
              />
            </div>
            <div class="form-group">
              <label for="percent">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="percent"
                aria-describedby="emailHelp"
                v-model="tempCoupon.percent"
              />
            </div>
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="is_enabled"
                v-model="tempCoupon.is_enabled"
                :true-value="1"
                :false-value="0"
              />
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delModal -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="removeCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination'
export default {
  data () {
    return {
      coupons: [],
      tempCoupon: {}, // 要送出驗證的內容
      pagination: {},
      isNew: false,
      delCoupon: false,
      isLoading: false
    }
  },
  methods: {
    openModal (isNew, delCoupon, item) {
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
        this.delCoupon = false
        $('#couponsModal').modal('show')
      } else if (!isNew && !delCoupon) {
        this.tempCoupon = Object.assign({}, item) // 避免物件傳參考的特性
        this.isNew = false
        this.delCoupon = false
        $('#couponsModal').modal('show')
      } else {
        this.tempCoupon = item
        this.isNew = false
        this.delCoupon = true
        $('#delCouponModal').modal('show')
      }
    },
    getCoupons (page = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response.data)
        vm.isLoading = false
        vm.pagination = response.data.pagination
        vm.coupons = response.data.coupons
        // TimesTapm 轉回 date
        vm.coupons.forEach((item) => {
          const dates = new Date(item.due_date * 1000)
          const year = dates.getFullYear()
          const month = dates.getMonth() + 1
          const date = dates.getDate()
          item.due_date = `${year} / ${month} / ${date}`
        })
      })
    },
    updateCoupon () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'
      const vm = this
      vm.isLoading = true
      // date 轉換成 TimesTemp
      vm.tempCoupon.due_date = Math.floor(
        new Date(vm.tempCoupon.due_date) / 1000
      )
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        // console.log(response.data);
        vm.isLoading = false
        if (response.data.success) {
          $('#couponsModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#couponsModal').modal('hide')
          vm.getCoupons()
          console.log('新增失敗')
        }
      })
    },
    removeCoupon () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      this.$http.delete(url).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          $('#delCouponModal').modal('hide')
          vm.getCoupons()
        } else {
          console.log(response.data.success)
          $('#delCouponModal').modal('hide')
          vm.getCoupons()
        }
      })
    }
  },
  components: {
    Pagination
  },
  created () {
    this.getCoupons()
  }
}
</script>
