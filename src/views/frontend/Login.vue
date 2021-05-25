<template>
  <div class="h-50 d-flex align-items-center login-custom">
    <loading :active.sync="isLoading"></loading>
    <form class="form-signin" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal text-center">Log In</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
        v-model="user.username"
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="user.password"
      />
      <div class="checkbox mb-4"></div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Log In</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  data () {
    return {
      isLoading: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      // API 伺服器路徑 / admin / signin
      vm.isLoading = true
      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          vm.isLoading = false
          const token = response.data.token
          const expired = response.data.expired
          // 寫入Cookie
          document.cookie = `myToken=${token}; expires=${new Date(expired)}`
          vm.$router.push('/admin/products')
        } else {
          vm.isLoading = false
          vm.$bus.$emit('message:push', 'Login Failed', 'danger')
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.login-custom {
  @media (max-width: 768px) {
    padding-top: 150px;
    padding-bottom: 150px;
  }
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
button:hover {
  color: #fff;
  background-color: #000;
  border-color: #000;
  transition: 0.5s;
}
</style>
