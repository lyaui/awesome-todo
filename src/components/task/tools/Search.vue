<template>
  <q-input outlined v-model="searchField" label="Search" class="col">
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  // 在computed中使用get與set來改變值
  //   https://pjchender.blogspot.com/2017/05/vue-computed-getter-setter.html
  computed: {
    ...mapState('tasks', ['search']),
    // 直接將computed 當作 v-model 在用
    searchField: {
      // 設定computed的值
      get() {
        const vm = this;
        return vm.search;
      },
      // 設定要觸發的動作
      set(value) {
        const vm = this;
        vm.setSearch(value);
      },
    },
  },
  methods: {
    ...mapActions('tasks', ['setSearch']),
  },
};
</script>
