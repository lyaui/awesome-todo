<template>
  <!-- 元件事件要加上native -->
  <q-item
    v-ripple
    @click.native="
      updateTask({
        id,
        updates: {
          completed: !task.completed,
        },
      })
    "
    :class="task.completed ? 'bg-amber-2' : 'bg-amber-1'"
  >
    <q-item-section side top>
      <q-checkbox :value="task.completed" class="no-pointer-events" />
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{ 'text-strikethrough': task.completed }">{{ task.name }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <div class="column justify-center">
          <q-icon v-if="task.dueTime" name="event" size="18px" class="q-mr-xs"></q-icon>
        </div>

        <div class="column">
          <q-item-label class="row justify-end" caption>{{ task.dueDate }}</q-item-label>
          <q-item-label class="row justify-end" caption
            ><small>{{ task.dueTime }}</small></q-item-label
          >
        </div>
      </div>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn dense flat round @click.stop="showEditTask = true" color="primary" icon="edit" />
        <q-btn
          dense
          flat
          round
          @click.stop="promptToDelete(id)"
          color="deep-orange-6"
          icon="delete"
        />
      </div>
    </q-item-section>
    <!-- 編輯modal -->
    <q-dialog v-model="showEditTask"
      ><edit-task @close="showEditTask = false" :task="task" :id="id"></edit-task
    ></q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex';
import EditTask from 'src/components/task/modals/EditTask.vue';

export default {
  props: ['task', 'id'],
  data() {
    return {
      showEditTask: false,
    };
  },
  components: { EditTask },
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
    promptToDelete(id) {
      const vm = this;
      vm.$q
        .dialog({
          title: 'Confirm',
          message: 'Really delete?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          vm.deleteTask(id);
        });
    },
  },
};
</script>
