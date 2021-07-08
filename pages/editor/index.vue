<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="article.tag"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click.prevent="submit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { submitArticle, getArticleDetail, submitUpdateArticle } from './api'
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'editor',
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tag: '',
      },
    }
  },
  mounted() {
    this.getEditData()
  },
  methods: {
    async submit() {
      let res
      if (this.article.slug) {
        res = await submitUpdateArticle(this.article.slug, {
          ...this.article,
          tagList: [this.article.tag],
        })
      } else {
        res = await submitArticle({ ...this.article, tagList: [this.article.tag] })
      }
      const { article } = res.data
      this.$router.push(`/article/${article.slug}`)
    },
    async getEditData() {
      const { slug = '' } = this.$route.query
      if (slug) {
        const { data } = await getArticleDetail(slug)
        const { article } = data
        this.article = article
      }
    },
  },
}
</script>

<style lang="scss">
</style>