/**
 * Created by jerry on 2017/4/13.
 */
import axios from 'axios'

let base = ''

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data) }

export const reqSaveUserProfile = params => { return axios.post(`${base}/user/profile`, params).then(res => res.data) }

export const reqGetUserList = params => { return axios.get(`${base}/user/list`, { params: params }) }

export const reqShowK = params => { return axios.get(`${base}/user/list`, { params: params }) }

export const reqGetshareListPage = params => { return axios.get(`${base}/share/list`, { params: params }) }

export const reqDeleteUser = params => { return axios.get(`${base}/user/delete`, { params: params }) }

export const reqEditshare = params => { return axios.get(`${base}/share/edit`, { params: params }) }

export const reqBatchDeleteshare = params => { return axios.get(`${base}/share/batchdelete`, { params: params }) }

export const reqAddshare = params => { return axios.get(`${base}/share/add`, { params: params }) }
