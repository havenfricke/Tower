<template>
  <div class="container-fluid bg-secondary">
    <div class="p-5"></div>
    <div class="p-3"></div>
    <div class="row">
      <div class="col-6 p-2">
        <img
          class="img-fluid rounded ms-4 shadow"
          :src="tActive.coverImg"
          alt=""
        />
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
            <div
              class="
                col-3
                p-2
                mt-5
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
    <div class="row d-flex mt-5 justify-content-center">
      <div class="col-8 p-5 rounded bg-light">
        <div class="row">
          <input
            class="rounded col-12"
            type="text"
            placeholder="Add a comment about this event..."
          />

          <div class="d-flex justify-content-end mt-3">
            <button class="btn hoverable col-3 bg-success">Add Comment</button>
          </div>
        </div>

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
            src="https://thiscatdoesnotexist.com"
            alt=""
            :title="name"
          />
          <h5 class="col-10">Person's name</h5>
          <div class="row">
            <p class="col-12 mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              iure libero quisquam neque ullam illo sint, voluptatem soluta,
              illum voluptatibus molestias quidem, porro quasi temporibus
              reprehenderit praesentium odit recusandae. Sint?
            </p>
          </div>
        </div>
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
