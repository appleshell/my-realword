const cookieParser = process.server ? require('cookieparser') : void 0

export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  // 这个方法仅会在服务端渲染时自动调用
  nuxtServerInit ({ commit }, { req }) {
    let auth = null

    if(req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.user)
      } catch (err) {
        
      }
    }

    commit('setUser', auth)
  }
}
