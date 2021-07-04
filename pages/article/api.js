import request from '../../utils/request'

export const getArticles = (params) => request.get('/api/articles', { params })