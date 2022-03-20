<template>
  <div
    class="
      row
      bg-white
      d-flex
      justify-content-start
      align-items-center
      shadow
      mt-3
      rounded
      p-3
    "
  >
    <img
      style="max-height: 5vh; width: auto"
      class="img-fluid col-2 rounded-circle"
      :src="comment.creator.picture"
      alt=""
      :title="comment.creator.name"
    />
    <h5 class="col-10">{{ comment.creator.name }}</h5>
    <div class="row">
      <p class="col-12 mt-3">
        {{ comment.creator.body }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
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