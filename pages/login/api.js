import request from '../../utils/request'

/**
 * @param {string} email-邮箱
 * @param {string} password-密码
*/
export const login = data => request.post('/api/users/login', data)

/**
 * @param {string} username
 * @param {string} email
 * @param {string} password
*/ 
export const register = data => request.post('/api/users', data)