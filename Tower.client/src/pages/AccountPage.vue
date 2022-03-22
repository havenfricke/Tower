<template>
  <div class="row mt-5 mx-4 my-3">
    <div class="p-5"></div>
    <div class="mt-5"></div>
    <div
      class="
        col-12
        text-center
        fs-1
        text-warning
        border-bottom border-warning
        mb-3
      "
    >
      My Tickets
    </div>

    <div
      v-for="m in myTickets"
      :key="m.id"
      class="col-lg-8 col-md-8 col-sm-12 rounded p-1"
    >
      <TicketCard :myTicket="m" />
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from "../services/TicketsService"
import { logger } from "../utils/Logger"
export default {
  name: 'Account',
  setup() {
    watchEffect(async () => {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        logger.error(error)
      }
    });
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
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
.glassy {
  -webkit-backdrop-filter: blur(8px); /* Safari 9+ */
  backdrop-filter: blur(8px); /* Chrome and Opera */
  box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.08);
}
</style>
