<template>
  <button class="border ddd border-light glassy rounded bg-light">
    <div class="row d-flex justify-content-end">
      <i
        @click="deleteTicket"
        title="delete ticket"
        class="col-2 fs-3 mb-1 mdi mdi-delete hoverable"
      ></i>
    </div>
    <img
      @click="goTo('Events')"
      class="img-fluid selectable hoverable rounded-top"
      title="navigate to event"
      :src="myTicket.event.coverImg"
      alt=""
    />

    <div class="col-12 mx-1 text-dark">
      <span class="row d-flex justify-content-center">
        <h4 class="col-12 p-2 text-center text-black">
          {{ myTicket.event.name }}
        </h4>
      </span>
    </div>
    <div class="text-start text-black">
      <ul>
        <li class="text-black">{{ myTicket.event.location }}</li>
        <li class="text-black">
          Starts at {{ new Date(myTicket.event.startDate).toDateString() }}
        </li>
        <li class="text-black">
          {{ myTicket.event.capacity }} remaining tickets
        </li>
      </ul>
    </div>
    <div
      v-if="myTicket.event.isCanceled == true"
      class="col-12 bg-danger my-1 text-center text-dark rounded"
    >
      <a class="text-black">Canceled</a>
    </div>
    <div
      v-if="myTicket.event.capacity == 0"
      class="col-12 bg-warning my-1 text-center text-dark rounded"
    >
      Sold Out
    </div>
  </button>
</template>

<script>
import { watchEffect } from "@vue/runtime-core"
import { useRouter } from "vue-router"
import { ticketsService } from "../services/TicketsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"

export default {
  props: {
    myTicket: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();


    return {
      async deleteTicket() {
        try {
          if (await Pop.confirm()) {
            await ticketsService.deleteTicket(props.myTicket.ticketId)
          }
        } catch (error) {
          logger.error(error)
        }
      },

      goTo(page) {
        router.push({
          name: page,
          params: { id: props.myTicket.event.id },
        });
      }
    }
  }
}
</script>

<style>
.ddd {
  cursor: default;
}
</style>