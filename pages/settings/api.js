import { request } from '../../plugins/request'

export const getUserInfo = username => request.get(`/api/profiles/${username}`)

export const updateUserInfo = data => request.put('/api/user', data)
