import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    Fav: [],
    FavId: [],
    existedFavId: [],
    isFav: true
  },
  // 操作行為
  // 非同步行為在此完成
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    addToFav (context, payload) {
      context.commit('FAVORITE', payload)
    },
    removeFromFav (context, payload) {
      context.commit('REMOVEFAVORITE', payload)
    },
    getFavId (context, payload) {
      context.commit('FAVSTAR', payload)
    }
  },
  // 操作資料狀態
  // 只做同步行為
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    FAVORITE (state, payload) {
      state.FavId.push(payload.id)
      state.Fav.push(payload)
      state.isFav = false
    },
    REMOVEFAVORITE (state, payload) {
      state.Fav = state.Fav.filter(item => {
        return item.id !== payload.id
      })
      state.FavId = state.FavId.filter(item => {
        return item !== payload.id
      })
      state.isFav = true
    },
    FAVSTAR (state, payload) {
      state.existedFavId = state.FavId.find(function (id, index) {
        return id === payload
      })
      if (state.existedFavId === payload) {
        state.isFav = false
      } else {
        state.isFav = true
      }
    }
  }
})
