<template>
  <q-banner class="bg-grey-3">
    <template v-slot:avatar>
      <q-icon name="check" color="primary" />
    </template>
    No tasks to do today!
    <template v-slot:action>
      <!-- event bus https://quasar.dev/options/global-event-bus#Usage -->
      <q-btn flat color="primary" label="Add Task" @click="$root.$emit('showAddTask')" />
    </template>
  </q-banner>
</template>
