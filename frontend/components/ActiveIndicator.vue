<template>
  <div
    :title="model.active ? 'Active' : 'Not active'"
    class="activity-status"
    :style="{
      'background-color': model.active ? 'green' : 'red',
    }"
    @click="updateModel"
  />
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      reqired: false,
      default: '',
    },
    model: {
      required: true,
      type: Object,
    },
    callback: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  methods: {
    updateModel() {
      this.$axios
        .put(`/api/${this.resource}/${this.model.id}`, {
          ...this.model,
          active: !this.model.active,
        })
        .then(() => {
          this.callback && this.callback()
        })
    },
  },
}
</script>

<style scoped>
.activity-status {
  height: 20px;
  width: 20px;
  border-radius: 100%;
  margin-left: 12px;
}
</style>
