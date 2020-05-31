<template>
  <div class="row q-mb-sm">
    <!-- https://ithelp.ithome.com.tw/articles/10225314 -->
    <q-input
      autofocus
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      class="col"
      label="Task name"
      ref="name"
      :rules="[(val) => !!val || 'Field is required']"
    >
      <template v-slot:append>
        <q-icon v-if="name" name="close"  class="cursor-pointer" /> </template
    ></q-input>
  </div>
</template>
<script>
export default {
  props: ['name'],
};
</script>
