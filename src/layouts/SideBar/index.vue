<template>
  <n-scrollbar class="h-screen">
    <div class="h-60px"></div>
    <n-menu
      :collapsed-width="54"
      :collapsed-icon-size="22"
      :indent="24"
      :options="menus"
      :render-icon="renderMenuIcon"
      :render-label="renderMenuLabel"
      :value="defaultValue"
    />
  </n-scrollbar>
</template>

<script setup lang="ts">
import { h, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
// import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
// import { LocationOutline as Location } from '@vicons/ionicons5'
import type { RouteRecordRaw } from 'vue-router'
import { getRoutes } from '@/router'

const menus = computed(() => {
  const routes = getRoutes()
  return setMenu(routes)
})

const setMenu = (routes: RouteRecordRaw[]): MenuOption[] => {
  return routes
    .filter(i => i.meta && i.meta.title && !i.meta.layout)
    .map(i => {
      return {
        label: i.meta?.title,
        key: i.path,
        children: i.children?.length ? setMenu(i.children) : undefined
      }
    })
}

const defaultValue = computed(() => {
  const route = useRoute()
  const { path } = route
  return path
})

const renderMenuIcon = (option: MenuOption) => {
  return '' // h(NIcon, null, { default: () => h(Location) })
}

const renderMenuLabel = (option: MenuOption) => {
  return option.children?.length
    ? (option.label as string)
    : h(
        RouterLink,
        {
          to: {
            path: option.key as string
          }
        },
        { default: () => option.label }
      )
}
</script>
<script lang="ts">
export default {
  name: 'SideBar'
}
</script>

<style lang="scss" scoped></style>
