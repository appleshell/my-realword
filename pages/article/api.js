import { request } from '../../plugins/request'

export const getArticleDetail = slug => request.get(`/api/articles/${slug}`)

export const getComments = slug => request.get(`/api/articles/${slug}/comments`)