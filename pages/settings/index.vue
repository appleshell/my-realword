<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="profile.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="profile.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="profile.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="profile.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="profile.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="updateProfile">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from './api'
import { mapState } from 'vuex'
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'settings',
  data() {
    return {
      profile: {
        username: '',
        bio: '',
        image: '',
        following: false,
        password: '',
      },
    }
  },
  mounted() {
    this.queryUser()
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async queryUser() {
      const { data } = await getUserInfo(this.user.username)
      this.profile = data.profile
    },
    async updateProfile() {
      const { data } = await updateUserInfo(this.profile)
      this.$router.push(`/profile/${data.user.username}`)
    },
  },
}
</script>

<style lang="scss">
</style>