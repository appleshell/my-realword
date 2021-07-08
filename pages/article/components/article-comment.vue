<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="commentText"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="this.user.image" class="comment-author-img" />
        <div class="btn btn-sm btn-primary" @click="addArticlComment">Post Comment</div>
      </div>
    </form>

    <div class="card" v-for="comment in commnets" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{ name: 'profile', params: { username: comment.author.username } }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{ name: 'profile', params: { username: comment.author.username } }"
          class="comment-author"
          >{{ comment.author.username }}</nuxt-link
        >
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment } from '../api'
import { mapState } from 'vuex'

export default {
  name: 'ArticleCommnet',
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      commnets: [],
      commentText: '',
    }
  },
  mounted() {
    this.queryComments()
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async queryComments() {
      const { data } = await getComments(this.article.slug)
      this.commnets = data.comments
    },
    async addArticlComment() {
      await addComment(this.article.slug, { comment: { body: this.commentText } })
      await this.queryComments()
      this.commentText = ''
    },
  },
}
</script>