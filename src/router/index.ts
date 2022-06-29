import { createRouter, createWebHashHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import type { RouteRecordRaw } from 'vue-router'
// import { token } from '@/utils/storage'
// import { delayPromise } from '@/utils'

// 生成父子路由
export const getRoutes = () => {
  const routeList: RouteRecordRaw[] = []
  // 按照sort排序
  routes.sort((a, b) => {
    const aSort = (a.meta?.sort as number) || Infinity
    const bSort = (b.meta?.sort as number) || Infinity
    if (aSort < bSort) {
      return -1
    } else if (aSort > bSort) {
      return 1
    } else {
      return 0
    }
  })

  routes.forEach(i => {
    const name = (i.name as string).split('-')
    const level = name.length
    pushRoute(i, level, routeList)
  })

  return routeList
}

function pushRoute(route: RouteRecordRaw, level: number, routeList: RouteRecordRaw[]) {
  if (level === 1) {
    routeList.push({
      ...route,
      children: []
    })
  } else {
    const name = (route.name as string).split('-')
    const findName = name.slice(0, name.length - level + 1).join('-')
    const curRouter = routeList.find(i => i.name === findName)
    pushRoute(route, level - 1, curRouter?.children || [])
  }
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes)
})

export const loginUrl = '/login'

// router.beforeEach(async (to, from) => {
//   window.$loadingBar.start()
//   const userStore = useUserStore()
//   await delayPromise(100)
//   if (to.path === loginUrl) {
//     userStore.logout()
//   } else {
//     if (!token.value) {
//       window.$loadingBar.finish()
//       return loginUrl
//     } else {
//       if (!userStore.userInfo.id) await userStore.getUserByToken()
//     }
//   }
//   window.$loadingBar.finish()
//   return true
// })

export default router
