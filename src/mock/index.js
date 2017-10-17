/**
 * Created by jerry on 2017/4/13.
 */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {LoginUsers, Users} from './data/user'
import {Shares} from './data/share'
let _Users = Users
let _Shares = Shares

export default {

  init () {
    let mock = new MockAdapter(axios)

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    })

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    })

    // 登录
    mock.onPost('/login').reply(arg => {
      let {username, password} = JSON.parse(arg.data)
      return new Promise((resolve, reject) => {
        let user = null
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u))
              delete user.password
              return true
            }
          })

          if (hasUser) {
            resolve([200, {code: 200, msg: '请求成功', user}])
          } else {
            resolve([200, {code: 500, msg: '账号或密码错误'}])
          }
        }, 1000)
      })
    })

    mock.onPost('/user/profile').reply(function (arg) {
      let {name, email} = JSON.parse(arg.data)
      return new Promise((resolve, reject) => {
        let user = LoginUsers[0]
        user.name = name
        user.email = email
        resolve([200, {code: 200, msg: '请求成功', user}])
      })
    })

    // 获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) === -1) return false
        return true
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }])
        }, 500)
      })
    })

    // 获取股票列表（分页）
    mock.onGet('/share/list').reply(config => {

      let {page, name} = config.params
      let mockShares = _Shares.filter(share => {
        if (name && share.name.indexOf(name) === -1) return false
        return true
      })
      let total = mockShares.length
      mockShares = mockShares.filter((u, index) => index < 10 * page && index >= 10 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            shares: mockShares
          }])
        }, 500)
      })
    })

    // 删除用户
    mock.onGet('/user/delete').reply(config => {
      let {id} = config.params
      _Users = _Users.filter(b => b.id !== id)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }])
        }, 500)
      })
    })

    // 编辑图书
    mock.onGet('/share/edit').reply(config => {
      let {id, name, author, description, publishAt} = config.params
      _Shares.some(u => {
        if (u.id === id) {
          u.name = name
          u.author = author
          u.description = description
          u.publishAt = publishAt
          return true
        }
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }])
        }, 500)
      })
    })

    // 批量删除图书
    mock.onGet('/share/batchdelete').reply(config => {
      let {ids} = config.params
      ids = ids.split(',')
      _Shares = _Shares.filter(u => !ids.includes(u.id))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }])
        }, 500)
      })
    })

    // 新增图书
    mock.onGet('/share/add').reply(config => {
      let {name, author, description, publishAt} = config.params
      _Shares.push({
        name: name,
        author: author,
        description: description,
        publishAt: publishAt
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }])
        }, 500)
      })
    })
  }

}
