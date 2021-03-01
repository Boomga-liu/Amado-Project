import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      name: 'Index',
      path: '/',
      component: () => import('@/components/frontend/Index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/frontend/Home.vue'),
          meta: { keepAlive: false }
        },
        {
          path: 'shop',
          name: 'Shop',
          component: () => import('@/views/frontend/Products.vue'),
          meta: { keepAlive: false }
        },
        {
          path: 'product_detail/:productId',
          name: 'ProductDetail',
          component: () => import('@/views/frontend/ProductDetail.vue'),
          meta: { keepAlive: false }
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('@/views/frontend/Cart.vue'),
          meta: { keepAlive: false }
        },
        {
          path: 'checkout',
          name: 'CheckOut',
          component: () => import('@/views/frontend/CheckOut.vue'),
          meta: { keepAlive: false }
        },
        {
          path: 'orders/:orderId',
          name: 'Orders',
          component: () => import('@/views/frontend/Orders.vue'),
          meta: { keepAlive: false }
        },
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/frontend/Login.vue'),
          meta: { keepAlive: false }
        }
      ]
    },
    {
      name: 'Dashboard',
      path: '/admin',
      component: () => import('@/components/backend/Dashboard.vue'),
      children: [
        {
          path: 'products',
          name: 'Products',
          component: () => import('@/views/backend/Products.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'backendorders',
          name: 'BackendOrders',
          component: () => import('@/views/backend/Orders.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: () => import('@/views/backend/Coupons.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      name: 'Dashboard2',
      path: '/',
      component: () => import('@/components/backend/Dashboard.vue'),
      children: [
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: () => import('@/views/backend/CustomerOrder.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: () => import('@/views/backend/CustomerCheckout.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
