import Vue from 'vue';
import { uid } from 'quasar';

const state = {
  // 因為firebase給予的是物件格式，所以將tasks設定為物件
  tasks: {
    ID1: {
      name: 'Get bananas',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30',
    },
    ID2: {
      name: 'Get cats',
      completed: false,
      dueDate: '2019/05/13',
      dueTime: '14:00',
    },
    ID3: {
      name: 'Get apples',
      completed: false,
      dueDate: '2019/05/14',
      dueTime: '16:00',
    },
  },
  search: '',
  sort: 'name',
};

const actions = {
  updateTask({ commit }, payload) {
    // console.log(payload);
    commit('updateTask', payload);
  },
  deleteTask({ commit }, id) {
    commit('deleteTask', id);
  },
  addTask({ commit }, task) {
    const taskId = uid();
    const payload = { id: taskId, task };
    commit('addTask', payload);
  },
  setSearch({ commit }, value) {
    commit('setSearch', value);
  },
  setSort({ commit }, value) {
    commit('setSort', value);
  },
};

const getters = {
  // sort 大小寫會影響排序sort()，方法會原地（in place）對一個陣列的所有元素進行排序
  tasksSorted(state) {
    const taskSorted = {};
    const keysOrdered = Object.keys(state.tasks);
    keysOrdered.sort((a, b) => {
      const taskAprop = state.tasks[a][state.sort].toLowerCase();
      const taskBprop = state.tasks[b][state.sort].toLowerCase();
      if (taskBprop > taskAprop) {
        return -1;
      }
      if (taskBprop < taskAprop) {
        return 1;
      }
      return 0;
    });
    keysOrdered.forEach((key) => {
      taskSorted[key] = state.tasks[key];
    });
    return taskSorted;
  },
  // 將排序好的物件丟到篩選物件裡
  tasksFiltered(state, getters) {
    const { tasksSorted } = getters;
    const tasks = {};
    // 轉換大小寫
    const searchLowerCase = state.search.toLowerCase();
    Object.keys(tasksSorted).forEach((key) => {
      const nameLowerCase = tasksSorted[key].name.toLowerCase();
      // includes 空字串會是true，因此若關鍵字空白會返還全部物件
      if (nameLowerCase.includes(searchLowerCase)) {
        tasks[key] = tasksSorted[key];
      }
    });
    return tasks;
  },
  // 可以將getters作為參數取得別的getters
  tasksTodo(state, getters) {
    const { tasksFiltered } = getters;
    const tasks = {};
    // Object.keys在loop陣列很重要
    Object.keys(tasksFiltered).forEach((key) => {
      if (!tasksFiltered[key].completed) {
        tasks[key] = tasksFiltered[key];
      }
    });
    return tasks;
  },
  tasksCompleted(state, getters) {
    const { tasksFiltered } = getters;
    const tasks = {};
    // Object.keys在loop陣列很重要
    Object.keys(tasksFiltered).forEach((key) => {
      if (tasksFiltered[key].completed) {
        tasks[key] = tasksFiltered[key];
      }
    });
    return tasks;
  },
};

const mutations = {
  updateTask(state, payload) {
    // Object.assign
    // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id) {
    // Delete object property
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
    // delete state.tasks[id];
    // 已經成功將物件從物件中刪除，然而畫面不會隨之更新因此改用 vue.delete https://cn.vuejs.org/v2/api/
    Vue.delete(state.tasks, id);
  },
  addTask(state, task) {
    Vue.set(state.tasks, task.id, task.task);
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSort(state, value) {
    state.sort = value;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
