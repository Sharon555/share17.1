import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'

import shareList from '@/components/share/list'
//import shareCategoryList from '@/components/sharecategory/list'

import UserList from '@/components/user/list'
import KLine from '@/components/user/kline'


// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
// mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '自选股',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/user/list', component: UserList, name: '自选股', menuShow: true},
        //{path:"/user/list/:code",component:KLine},
       
      ]
    },
     {
       path:"/user/kline/:code",
       name:'k线查看',
       component:KLine
    },
    
    {
      path: '/',
      component: Home,
      name: '查看市场',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/share/list', component: shareList, name: '查看市场', menuShow: true}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.sessionStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
