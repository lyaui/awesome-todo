<template
  ><div class="q-mt-lg">
    <list-header bgColor="bg-orange-6">Completed</list-header>
    <q-list v-if="Object.keys(tasksCompleted).length" bordered separator class="bg-orange-1">
      <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key"></task>
    </q-list>
  </div>
</template>

<script>
import task from 'src/components/task/Task.vue';
import ListHeader from 'src/components/shared/ListHeader.vue';

export default {
  props: ['tasksCompleted'],
  components: { task, ListHeader },
};
</script>
