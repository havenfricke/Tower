<template>
  <img
    style="max-height: 5vh; width: auto"
    class="hoverable img-fluid rounded-circle"
    :src="eTicket.account.picture"
    alt=""
    :title="eTicket.account.name"
  />
</template>

<script>

export default {
  props: {
    eTicket: {
      type: Object,
      required: true
    }
  },
  setup() {

    return {}
  }
}
</script>

<style>
</style>