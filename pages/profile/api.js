import { request } from '../../plugins/request'

// 获取全部文章
export const getArticles = params => request.get('/api/articles', { params })

// 点赞
export const addFavorite = slug => request.post(`/api/articles/${slug}/favorite`)

// 取消点赞
export const cancelFavorite = slug => request.delete(`/api/articles/${slug}/favorite`)