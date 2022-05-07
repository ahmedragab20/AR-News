<template>
  <v-dialog
    v-model="dialogWatcher"
    @keydown.esc="dialogHandler('')"
    @click:outside="!persistent ? dialogHandler('') : ''"
    :persistent="persistent"
  >
    <slot></slot>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    dialogHandler: {
      type: Function,
      required: true,
    },
    persistent: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      dialogWatcher: this.dialog,
    }
  },
  watch: {
    dialog(newVal, oldVal) {
      this.dialogWatcher = newVal || this.dialog
    },
  },
}
</script>
