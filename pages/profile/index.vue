<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <a class="btn btn-sm btn-outline-secondary action-btn" href="/settings">
              <i class="ion-gear-a"></i> Edit Profile Settings
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link" :class="{ active: tab === 'mine' }" @click="toggleTab('mine')"
                  >My Articles</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{ active: tab === 'favor' }" @click="toggleTab('favor')"
                  >Favorited Articles</a
                >
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li
                  class="tag-default tag-pill tag-outline"
                  v-for="tag in article.tagList"
                  :key="tag"
                >
                  {{ tag }}
                </li>
              </ul>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, addFavorite, cancelFavorite } from './api'
import { mapState } from 'vuex'
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'profile',
  data() {
    return {
      tab: 'mine',
      articles: [],
    }
  },
  mounted() {
    this.getMyArticle()
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async getMyArticle() {
      const key = this.tab === 'mine' ? 'author' : 'favorited'
      const { data } = await getArticles({ [key]: this.user.username })
      this.articles = data.articles
    },
    toggleTab(tab) {
      this.tab = tab
      this.getMyArticle()
    },
    async onFavorite(article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        await cancelFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    },
  },
}
</script>

<style lang="scss">
</style>