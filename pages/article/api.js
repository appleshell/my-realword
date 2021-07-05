import { request } from '../../plugins/request'

export const getArticles = (params) => request.get('/api/articles', { params })