<template>
  <q-card>
    <modal-header>Add Task</modal-header>
    <q-form @submit="submitForm">
      <q-card-section class="q-pt-none">
        <!-- 實現類似雙向榜定的功能 https://ithelp.ithome.com.tw/articles/10225314 -->
        <modal-task-name ref="modalTaskName" :name.sync="taskToSubmit.name"></modal-task-name>
        <modal-due-date :date.sync="taskToSubmit.dueDate" @clear="clearDueDate"></modal-due-date>
        <modal-due-time
          v-if="taskToSubmit.dueDate"
          :date="taskToSubmit.dueDate"
          :time.sync="taskToSubmit.dueTime"
        ></modal-due-time>
      </q-card-section>
      <modal-buttons></modal-buttons>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex';
import ModalHeader from 'src/components/task/modals/Shared/ModalHeader.vue';
import ModalTaskName from 'src/components/task/modals/Shared/ModalTaskName.vue';
import ModalDueDate from 'src/components/task/modals/Shared/ModalDueDate.vue';
import ModalDueTime from 'src/components/task/modals/Shared/ModalDueTime.vue';
import ModalButtons from 'src/components/task/modals/Shared/ModalButtons.vue';

export default {
  components: {
    ModalHeader,
    ModalTaskName,
    ModalDueDate,
    ModalDueTime,
    ModalButtons,
  },
  data() {
    return {
      taskToSubmit: {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false,
      },
    };
  },
  methods: {
    ...mapActions('tasks', ['addTask']),

    submitForm() {
      // https://quasar.dev/vue-components/form#QForm-API
      // 會給予this.$refs.name.validate()會給予true/false值，可確認是否通過驗證
      const vm = this;
      vm.$refs.modalTaskName.$refs.name.validate();
      if (!vm.$refs.modalTaskName.$refs.name.hasError) {
        vm.submitTask();
      }
    },
    submitTask() {
      const vm = this;
      vm.addTask(vm.taskToSubmit);
      // 傳給modal叫它關閉
      vm.$emit('close');
    },
    clearDueDate() {
      const vm = this;
      vm.taskToSubmit.dueDate = '';
      vm.taskToSubmit.dueTime = '';
    },
  },
};
</script>
