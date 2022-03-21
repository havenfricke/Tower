<template>
  <div class="row mx-4 my-3">
    <div
      v-for="m in myTickets"
      :key="m.id"
      class="col-2 rounded bg-light hoverable p-1"
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
      myTickets: computed(() => AppState.myEvents)
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
</style>
