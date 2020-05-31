<template>
  <q-page class="q-pa-md">
    <!-- search & sort -->
    <div class="row q-mb-lg"><search></search><sort></sort></div>
    <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">
      No search results.
    </p>

    <!-- no tasks -->
    <no-tasks
      @showAddTask="showAddDailog = true"
      v-if="!Object.keys(tasksTodo).length && !search"
    ></no-tasks>
    <!-- 待辦 -->
    <tasks-todo v-if="Object.keys(tasksTodo).length" :tasksTodo="tasksTodo"></tasks-todo>
    <!-- 完成的 -->
    <tasks-completed
      v-if="Object.keys(tasksCompleted).length"
      :tasksCompleted="tasksCompleted"
    ></tasks-completed>
    <!-- add button -->
    <div class="fixed-bottom absolute-bottom text-center q-mb-lg">
      <q-btn round color="primary" size="24px" icon="add" @click="showAddDailog = true" />
    </div>
    <!-- 新增modal -->
    <q-dialog v-model="showAddDailog"
      ><add-task @close="showAddDailog = false"></add-task
    ></q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import addTask from 'src/components/task/modals/AddTask.vue';
import tasksTodo from 'src/components/task/tasksTodo.vue';
import tasksCompleted from 'src/components/task/tasksCompleted.vue';
import NoTasks from 'src/components/task/NoTasks.vue';
import Search from 'src/components/task/tools/Search.vue';
import Sort from 'src/components/task/tools/Sort.vue';

export default {
  data() {
    return { showAddDailog: false };
  },
  components: {
    addTask,
    tasksTodo,
    tasksCompleted,
    NoTasks,
    Search,
    Sort,
  },
  computed: {
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
    ...mapState('tasks', ['search']),
  },
  mounted() {
    const vm = this;
    vm.$root.$on('showAddTask', () => {
      vm.showAddDailog = true;
    });
  },
};
</script>
<style></style>
