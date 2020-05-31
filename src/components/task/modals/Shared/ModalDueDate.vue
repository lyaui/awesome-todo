<template>
  <div class="row q-mb-sm">
    <q-input outlined :value="date" @input="$emit('update:date', $event)" label="Due date">
      <template v-slot:append>
        <q-icon v-if="date" name="close" class="cursor-pointer" @click="$emit('clear')" />
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date
              :value="date"
              @input="
                $emit('update:date', $event);
                () => $refs.qDateProxy.hide();
              "
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ['date'],
};
</script>
