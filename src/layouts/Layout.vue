<template>
  <!-- 使用layout builder更改view
https://quasar.dev/layout/layout#Layout-Builder -->
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <!-- Css Position https://quasar.dev/style/positioning#Introduction -->
        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Navigation
        </q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-footer>
      <q-tabs>
        <!-- Connecting to Vue Router -->
        <q-route-tab
          v-for="link in essentialLinks"
          :key="link.title"
          :icon="link.icon"
          :label="link.title"
          :to="link.link"
        />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink';

export default {
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Todo',
          icon: 'list',
          link: '/',
        },
        {
          title: 'Settings',
          icon: 'settings',
          link: '/settings',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  /* 因為footer沒有breakpoint功能所以手動寫css調整 */
  .q-footer {
    display: none;
  }
}

.q-drawer {
  .q-router-link--exact-active {
    color: #ffffff !important;
  }
}
</style>
