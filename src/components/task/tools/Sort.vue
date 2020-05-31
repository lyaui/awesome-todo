<template>
  <q-select
    filled
    v-model="sortBy"
    :options="options"
    label="Sort by"
    map-options
    emit-value
    stack-label
    class="col q-ml-sm"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      // 參考 QSelect API
      options: [
        { label: 'Name', value: 'name' },
        { label: 'Date', value: 'dueDate' },
      ],
    };
  },
  computed: {
    ...mapState('tasks', ['sort']),
    // 直接將computed 當作 v-model 在用
    sortBy: {
      get() {
        const vm = this;
        return vm.sort;
      },
      set(value) {
        const vm = this;
        vm.setSort(value);
      },
    },
  },
  methods: {
    ...mapActions('tasks', ['setSort']),
  },
};
</script>
<style scoped>
.q-select {
  flex: 0 0 112px;
}
</style>
