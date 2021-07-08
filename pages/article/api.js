import { request } from '../../plugins/request'

export const getArticleDetail = slug => request.get(`/api/articles/${slug}`)

export const getComments = slug => request.get(`/api/articles/${slug}/comments`)

export const addComment = (slug, data) => request.post(`/api/articles/${slug}/comments`, data)

export const deleteArticle = slug => request.delete(`/api/articles/${slug}`)
