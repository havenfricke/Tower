<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-12 d-flex justify-content-center">
        <div class="row d-flex justify-content-center">
          <div class="p-5"></div>
          <h1
            class="col-12 p-3 img-fluid border border-info rounded"
            style="
              width: 90vw;
              height: 60vh;
              background-image: url('https://www.em-normandie.com/sites/default/files/2019-12/msc-international-events-management.jpg')
              background-size: contain;
            "
          >
            <p class="p-2 border-bottom border-light">Events for everyone 
              <ul>
              <li class="fs-4 ms-5 mt-4 text-white">Plan your events</li>
              <li class="fs-4 ms-5 mt-4 text-white">Find events that interest you</li>
              <li class="fs-4 ms-5 mt-4 text-white">Become a part of the communities you love</li>
              <li class="fs-4 ms-5 mt-4 text-white">Set the world on fire</li>
              <li class="fs-4 ms-5 mt-4 text-white">Just kidding, but your parties will be lit</li>
              </ul>
              </p>
          </h1>
        </div>
    </div>
        <div class="row d-flex justify-content-center p-5">
          <div class="col-12 fs-5 bg-secondary rounded p-1 mx-3">
            <span class="row d-flex justify-content-around text-info p-3"><a @click="filterConcert" class="col-2 text-center hoverable text-info">CONCERT</a><a @click="filterConvention" class="col-2 text-center hoverable text-info">CONVENTION</a><a @click="filterSport" class="col-2 text-center hoverable text-info">SPORT</a><a @click="filterDigital" class="col-2 text-center hoverable text-info">DIGITAL</a> <a @click="filterFilter" class="col-2 text-center text-align hoverable text-warning">ALL EVENTS</a></span> 
          </div>
        </div>
        <div class="container">
        <div class="row d-flex justify-content-center mx-4 my-3">

          <div v-for="t in tEvents" :key="t.id" class="col-4 border border-secondary border-lg rounded bg-light hoverable p-1">
            <EventCard :tEvent="t"/>
          </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "@vue/runtime-core"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
export default {
  name: 'Home',
  setup() {
    watchEffect(async () => {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        logger.log(error)
      }
    });
    return {
      async filterConcert() {
        try {
          await eventsService.getConcerts()
        } catch (error) {
          logger.log(error)
        }
      },
      async filterConvention() {
        try {
          await eventsService.getConventions()
        } catch (error) {
          logger.log(error)
        }
      },
      async filterSport() {
        try {
          await eventsService.getSports()
        } catch (error) {
          logger.log(error)
        }
      },
      async filterDigital() {
        try {
          await eventsService.getDigital()
        } catch (error) {
          logger.log(error)
        }
      },
      async filterFilter() {
        try {
          await eventsService.getAllEvents()
        } catch (error) {
          logger.log(error)
        }
      },
      tEvents: computed(() => AppState.tEvents),
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
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
