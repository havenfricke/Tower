<template>
  <button @click="goTo('Events')" class="border border-light rounded bg-light">
    <img class="img-fluid rounded-top" :src="tEvent.coverImg" alt="" />
    <div class="col-12 mx-1 text-dark">
      <span class="row d-flex justify-content-center">
        <h4 class="col-12 p-2 text-center">
          {{ tEvent.name }}
        </h4>
      </span>
    </div>
    <div class="text-start">
      <ul>
        <li>{{ tEvent.location }}</li>
        <li>Starts at {{ new Date(tEvent.startDate).toDateString() }}</li>
        <li>{{ tEvent.capacity }} remaining tickets</li>
      </ul>
    </div>
    <div
      v-if="tEvent.isCanceled == true"
      class="col-12 bg-danger my-1 text-center text-dark rounded"
    >
      Canceled
    </div>
    <div
      v-if="tEvent.capacity == 0"
      class="col-12 bg-warning my-1 text-center text-dark rounded"
    >
      Sold Out
    </div>
  </button>
</template>

<script>
import { useRouter } from "vue-router"
export default {
  props: {
    tEvent: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();
    return {
      goTo(page) {
        router.push({
          name: page,
          params: { id: props.tEvent.id },
        });
      },
    }
  }
}
</script>

<style>
</style>