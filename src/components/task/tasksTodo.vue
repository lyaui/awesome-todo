<template
  ><div>
    <list-header bgColor="bg-teal-4">Todo</list-header>
    <!-- 將 Object.keys() 帶入陣列的話，會返還包含所有properties的陣列，因此若陣列為長度為0，則代表為空陣列 -->
    <!-- https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/keys -->
    <q-list v-if="Object.keys(tasksTodo).length" bordered separator class="bg-orange-1">
      <!-- 因為tasks改為物件的型態，所以v-for也要作調整 -->
      <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key"></task>
    </q-list>
  </div>
</template>

<script>
import task from 'src/components/task/Task.vue';
import ListHeader from 'src/components/shared/ListHeader.vue';

export default {
  props: ['tasksTodo'],
  components: { task, ListHeader },
};
</script>
