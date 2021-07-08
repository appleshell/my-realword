<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up'}}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link to="/login" v-if="!isLogin">Have an account?</nuxt-link>
            <nuxt-link to="/register" v-else>Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, key) in errors">

              <li v-for="(message, index) in messages" :key="index">{{`${key} ${message}`}}</li>

            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input class="form-control form-control-lg" v-model="user.username" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" v-model="user.email" type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" v-model="user.password" type="password" placeholder="Password" required>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up'}}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from './api'
const Cookie = process.client ? require('js-cookie') : void 0

export default {
  middleware: 'notAuthenticated',
  name: 'login',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      errors: {}
    }
  },
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  methods: {
    async onSubmit () {
      const user = this.user
      let userRes = {}
      try {
        if (this.isLogin) {
          userRes = await login({ user })
        } else {
          userRes = await register({ user })
        }
        this.$store.commit('setUser', userRes.data.user)

        Cookie.set('user', userRes.data.user)
        this.$router.push('/')
      } catch (err) {
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>

<style lang="scss">
</style>