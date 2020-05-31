<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="time"
      @input="$emit('update:time', $event)"
      label="Due time"
      class="col"
    >
      <template v-slot:append>
        <q-icon v-if="time" name="close" @click="$emit('update:time', '')" class="cursor-pointer" />
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time :value="time" @input="$emit('update:time', $event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ['time'],
};
</script>
