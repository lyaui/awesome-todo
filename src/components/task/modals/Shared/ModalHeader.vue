<template>
  <!-- Qspace https://quasar.dev/vue-components/space#Usage -->
  <!-- 當然也是可以使用 justify-between -->
  <q-card-section class="row">
    <div class="text-h6"><slot></slot></div>
    <q-space></q-space>
    <!-- Close Popup Directive https://quasar.dev/vue-directives/close-popup#Basic -->
    <q-btn v-close-popup flat round dense color="primary" icon="close" />
  </q-card-section>
</template>
