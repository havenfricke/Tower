<template>
  <button @click="goTo('Events')" class="border border-light rounded bg-light">
    <img class="img-fluid rounded-top" :src="eventInfo.coverImg" alt="" />
    <div class="col-12 mx-1 text-dark">
      <span class="row d-flex justify-content-center">
        <h4 class="col-12 p-2 text-center">
          {{ eventInfo.name }}
        </h4>
      </span>
    </div>
    <div class="text-start">
      <ul>
        <li>{{ eventInfo.location }}</li>
        <li>Starts at {{ new Date(eventInfo.startDate).toDateString() }}</li>
        <li>{{ eventInfo.capacity }} remaining tickets</li>
      </ul>
    </div>
    <div
      v-if="eventInfo.isCanceled == true"
      class="col-12 bg-danger my-1 text-center text-dark rounded"
    >
      <a class="text-black">Canceled</a>
    </div>
    <div
      v-if="eventInfo.capacity == 0"
      class="col-12 bg-warning my-1 text-center text-dark rounded"
    >
      Sold Out
    </div>
  </button>
</template>

<script>

export default {
  props: {
    myTicket: {
      type: Object,
      required: true
    }
  },
  setup(props) {

    return {
    }
  }
}
</script>

<style>
</style>