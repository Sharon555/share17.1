/**
 * Created by jerry on 2017/4/13.
 */
import Mock from 'mockjs'
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    email: 'jerry9022@qq.com',
    name: '超级管理员'
  }
]

const Users = []
for (let i = 0; i < 100; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name:Mock.Random.csentence(4,4),
    'code|100000-999999':1, //在数组中随机找一个
    'updown|1':['-0.02','-0.15','-4.56','-3.72','1.15'],
    'range|-5-3.2':1,
    'exist|18-1000':1,
    'open|5-15.2':1,
    'close|5-15.2':1,
    'price|5-15.2':1,
    'high|10-15.2':1,
    'low|5-7.2':1

  }))
}

export {LoginUsers, Users}
