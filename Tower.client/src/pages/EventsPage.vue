<template>
  <div class="container-fluid bg-secondary">
    <div class="p-5"></div>
    <div class="p-3 mt-5"></div>
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12 align-items-top p-2">
        <div class="d-flex justify-content-center">
          <img
            class="img-fluid rounded ms-0 shadow"
            :src="tActive.coverImg"
            alt=""
          />
        </div>
        <div class="d-flex justify-content-center">
          <div
            v-if="tActive.isCanceled == true"
            class="col-12 bg-danger p-2 mt-4 text-center text-dark rounded"
          >
            <a class="text-black">Canceled</a>
          </div>
        </div>
        <div
          v-if="tActive.capacity == 0"
          class="col-12 bg-warning p-2 mt-4 text-center text-dark rounded"
        >
          Sold Out
        </div>
      </div>
      <div class="border-start border-warning col-lg-6 col-md-6 col-sm-12">
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
              v-if="
                rsvpCheck == accountId &&
                tActive.capacity !== 0 &&
                tActive.isCanceled !== true
              "
              class="
                col-lg-3 col-md-3 col-sm-12
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
            <div
              v-if="
                account.id == tActive.creatorId && tActive.isCanceled !== true
              "
              data-bs-toggle="modal"
              data-bs-target="#editEventModal"
              class="
                col-lg-3 col-md-3 col-sm-12
                p-2
                mt-2
                ms-1
                hoverable
                text-center
                bg-warning
                text-white
                rounded
              "
            >
              Edit Event
            </div>
          </div>
        </ul>
        <Modal id="editEventModal">
          <template #title> Edit Event </template>
          <template #body>
            <div class="row">
              <div class="col-12">
                <form @submit.prevent="editEvent">
                  Event Name
                  <input
                    v-model="edited.name"
                    type="text"
                    class="col-12 bg-secondary text-light rounded"
                  />

                  Description
                  <input
                    v-model="edited.description"
                    type="text"
                    class="col-12 bg-secondary text-light rounded"
                  />

                  <div class="row p-3 mt-2">
                    <button class="col-12 btn btn-success">Save Changes</button>
                  </div>
                </form>
                <div class="row p-3 mt-2">
                  <button
                    v-if="account.id == tActive.creatorId"
                    @click="cancelEvent"
                    data-bs-dismiss="modal"
                    class="col-12 btn btn-danger"
                  >
                    Cancel Event
                  </button>
                </div>
              </div>
            </div>
          </template>
        </Modal>
      </div>
    </div>
    <div class="row p-3">
      <h4
        class="text-center mt-3 p-2 border-bottom border-warning text-warning"
      >
        Event Attendees
      </h4>
      <div class="col-12 bg-dark rounded p-1">
        <div class="row">
          <div v-for="e in eTickets" :key="e.id" class="col-2">
            <Attendees :eTicket="e" />
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex mt-3 justify-content-center">
      <div class="col-lg-8 col-md-8 col-sm-12 p-4 mb-5 rounded bg-light">
        <div class="row">
          <form @submit.prevent="createComment">
            <textarea
              required
              v-model="editable.body"
              class="rounded col-12"
              type="text"
              placeholder="Add a comment about this event..."
            />

            <div class="d-flex justify-content-end mt-3">
              <button
                class="btn hoverable col-lg-3 col-md-3 col-sm-12 bg-success"
              >
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
import Pop from "../utils/Pop"
export default {
  name: 'Events',
  setup() {
    const route = useRoute();
    const editable = ref({
      eventId: route.params.id
    });
    const edited = ref({});

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
      edited,
      async createComment() {
        try {
          await commentsService.createComment(editable.value)
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
      async editEvent() {
        try {
          await eventsService.editEvent(edited.value, route.params.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async cancelEvent() {
        try {
          if (await Pop.confirm()) {
            await eventsService.cancelEvent(route.params.id)
          }
        } catch (error) {
          logger.error(error)
        }
      },

      tActive: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      myTickets: computed(() => AppState.myTickets),
      eTickets: computed(() => AppState.eTickets),
      account: computed(() => AppState.account),
      rsvpCheck: computed(() => AppState.eTickets.find(t => t.account.id == AppState.account.id))
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
