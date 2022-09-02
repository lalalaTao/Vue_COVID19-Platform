import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/test02',
    children: [
      {
        path: 'test02',
        component: () => import('@/views/demo02/test02'),
        name: '疫情地图',
        meta: { title: '疫情地图', icon: 'chart', affix: true }
      },
      // {
      //   path: 'test03',
      //   component: () => import('@/views/demo03/test03'),
      //   name: '个人信息列表',
      //   meta: { title: '个人信息列表', icon: 'list', affix: true }
      // },
      {
        path: 'test03_2',
        component: () => import('@/views/demo03/test03_2'),
        name: '个人信息列表',
        meta: { title: '个人信息列表', icon: 'list', affix: true }
      },
      {
        path: 'test04',
        component: () => import('@/views/demo03/test04'),
        name: '个人信息详情',
        meta: { title: '个人信息详情', icon: 'form', affix: true }
      },
      {
        path: 'demo01',
        component: () => import('@/views/demo01/test01'),
        name: '轨迹恢复-01',
        meta: { title: '轨迹恢复-01', icon: 'guide', affix: true }
      },
      {
        path: 'demo02',
        component: () => import('@/views/demo01/test02'),
        name: '轨迹恢复-02',
        meta: { title: '轨迹恢复-02', icon: 'guide', affix: true }
      },
      {
        path: 'demo03',
        component: () => import('@/views/demo01/test03'),
        name: '轨迹恢复-03',
        meta: { title: '轨迹恢复-03', icon: 'guide', affix: true }
      }
    ]
  }
]

export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
