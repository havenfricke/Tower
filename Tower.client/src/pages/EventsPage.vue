<template>
  <div class="container-fluid bg-secondary">
    <div class="p-5"></div>
    <div class="p-3"></div>
    <div class="row">
      <div class="col-6 p-2">
        <img class="img-fluid rounded shadow" :src="tActive.coverImg" alt="" />
      </div>
      <div class="border-start border-warning col-6">
        <ul>
          <h1 class="border-bottom border-warning text-warning">
            {{ tActive.name }}
          </h1>
          <li class="p-3">{{ tActive.location }}</li>
          <li class="p-3">
            Starts at {{ new Date(tActive.startDate).toDateString() }}
          </li>
          <li class="p-3">{{ tActive.capacity }} remaining tickets</li>
          <p class="p-4 mb-5">{{ tActive.description }}</p>
          <div class="row d-flex justify-content-end p-5">
            <button
              class="col-3 p-2 mt-5 hoverable bg-success text-white rounded"
            >
              RSVP
            </button>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { eventsService } from "../services/EventsService"
import { useRoute } from "vue-router"
export default {
  name: 'Events',
  setup() {
    const route = useRoute();


    if (route.params.id) {
      watchEffect(async () => {
        try {
          await eventsService.getEventById(route.params.id)
        } catch (error) {
          logger.log(error)
        }
      });
    }
    return {
      tActive: computed(() => AppState.activeEvent),

    }
  }
}
</script>

<style>
.hoverable:hover {
  transform: scale(1.09);
  filter: drop-shadow(0px 15px 10px rgba(0, 0, 0, 0.3));
  transition: 50ms ease-in-out;
  cursor: pointer;
}
.hoverable:active {
  transform: scale(0.98);
  transition: 50ms ease-in-out;
}
</style>
