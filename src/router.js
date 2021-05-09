import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/shop'
    },
    {
      path: '/',
      name: 'ImagePage',
      component: () => import('@/views/frontend/ImagePage.vue')
    },
    {
      name: 'Index',
      path: '/shop',
      component: () => import('@/components/frontend/Index.vue'),
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/views/frontend/Home.vue'),
          meta: { keepAlive: false }
        },
        {
          path: 'products',
          name: 'Products',
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
          path: 'favorite',
          name: 'Favorite',
          component: () => import('@/views/frontend/Favorite.vue'),
          meta: { keepAlive: false }
        },
        {
          path: 'cartcheckout',
          name: 'CartCheckOut',
          component: () => import('@/views/frontend/CartCheckOut.vue'),
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
          path: 'coupon',
          name: 'Coupon',
          component: () => import('@/views/frontend/Coupon.vue'),
          meta: { keepAlive: false }
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/frontend/Login.vue'),
          meta: { keepAlive: false }
        },
        {
          path: 'newthisweek',
          name: 'NewThisWeek',
          component: () => import('@/views/frontend/NewThisWeek.vue'),
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
