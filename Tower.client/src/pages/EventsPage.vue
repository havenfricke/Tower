<template>
  <div class="container-fluid bg-secondary">
    <div class="p-5"></div>
    <div class="p-3"></div>
    <div class="row">
      <div class="col-6 align-items-top p-2">
        <img
          class="img-fluid rounded ms-0 shadow"
          :src="tActive.coverImg"
          alt=""
        />
        <div
          v-if="tActive.isCanceled == true"
          class="col-12 bg-danger my-1 text-center text-dark rounded"
        >
          <a class="text-black">Canceled</a>
        </div>
        <div
          v-if="tActive.capacity == 0"
          class="col-12 bg-warning my-1 text-center text-dark rounded"
        >
          Sold Out
        </div>
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
          <p class="p-3 mb-2">{{ tActive.description }}</p>
          <div class="row d-flex justify-content-end p-5">
            <div
              @click="createTicket(account.id)"
              class="
                col-3
                p-2
                mt-2
                hoverable
                text-center
                bg-success
                text-white
                rounded
              "
            >
              RSVP
            </div>
          </div>
        </ul>
      </div>
    </div>
    <div class="row p-3">
      <h4
        class="text-center mt-3 p-2 border-bottom border-warning text-warning"
      >
        Event Attendees
      </h4>
      <div class="col-12 bg-dark rounded p-2">
        <div class="row">
          <div class="col-2">
            <img
              style="max-height: 5vh; width: auto"
              class="hoverable img-fluid rounded-circle"
              src="https://thiscatdoesnotexist.com"
              alt=""
              :title="name"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex mt-3 justify-content-center">
      <div class="col-8 p-5 mb-5 rounded bg-light">
        <div class="row">
          <form @submit.prevent="createComment">
            <input
              v-model="editable.body"
              class="rounded col-12"
              type="text"
              placeholder="Add a comment about this event..."
            />

            <div class="d-flex justify-content-end mt-3">
              <button class="btn hoverable col-3 bg-success">
                Add Comment
              </button>
            </div>
          </form>
        </div>

        <div v-for="c in comments" :key="c.id">
          <Comment :comment="c" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { createCommentVNode, onMounted, watchEffect } from "@vue/runtime-core"
import { eventsService } from "../services/EventsService"
import { useRoute } from "vue-router"
import { commentsService } from "../services/CommentsService"
import { logger } from "../utils/Logger"
import { ticketsService } from "../services/TicketsService"
export default {
  name: 'Events',
  setup() {
    const route = useRoute();
    const editable = ref({
      eventId: route.params.id
    });

    if (route.params.id) {
      watchEffect(async () => {
        try {
          await eventsService.getEventById(route.params.id)
          await commentsService.getEventComments(route.params.id)
          await ticketsService.getEventTickets(route.params.id)
          await ticketsService.getMyTickets()
        } catch (error) {
          logger.error(error)
        }
      });
    }
    return {
      editable,
      route,
      async createComment() {
        try {
          await commentsService.createComment(editable.value)
          reset()
        } catch (error) {
          logger.error(error)
        }
      },
      async createTicket() {
        let newTicket = {
          accountId: AppState.account.id,
          eventId: AppState.activeEvent.id,
        }
        ticketsService.createTicket(newTicket)
      },
      tActive: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      myTickets: computed(() => AppState.myTickets),
      eTickets: computed(() => AppState.eTickets),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style>
.hoverable:hover {
  transform: scale(1.03);
  filter: drop-shadow(0px 15px 10px rgba(0, 0, 0, 0.3));
  transition: 50ms ease-in-out;
  cursor: pointer;
}
.hoverable:active {
  transform: scale(0.98);
  transition: 50ms ease-in-out;
}
</style>
