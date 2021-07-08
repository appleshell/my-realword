import { request } from '../../plugins/request'

export const submitArticle = data => request.post('/api/articles', data)

export const submitUpdateArticle = (slug, data) => request.put(`/api/articles/${slug}`, data)

export const getArticleDetail = slug => request.get(`/api/articles/${slug}`)
