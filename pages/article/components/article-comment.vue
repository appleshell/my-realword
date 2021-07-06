<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in commnets" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{commnet.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{name: 'profile', params: {username: comment.author.username}}" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{name: 'profile', params: {username: comment.author.username}}" class="comment-author">{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import { getComments } from '../api'

export default {
  name: 'ArticleCommnet',
  props: {
    article: {
      type: Object,
      require: true,
    }
  },
  data () {
    return {
      commnets: []
    }
  },
  async mounted () {
    const { data } = await getComments(this.article.slug)
    console.log(data)
    this.commnets = data.comments
  }
}
</script>