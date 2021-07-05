import { request } from '../../plugins/request'

// 获取全部文章
export const getArticles = (params) => request.get('/api/articles', { params })

// 获取tags列表
export const getTags = () => request.get('/api/tags')

// 获取用户的文章
export const getYourFeedArticles = params => request.get('/api/articles/feed', { params })

// 点赞
export const addFavorite = slug => request.post(`/api/articles/${slug}/favorite`)

// 取消点赞
export const cancelFavorite = slug => request.delete(`/api/articles/${slug}/favorite`)