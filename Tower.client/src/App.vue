<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <Modal id="addEventModal">
      <template #title> Create an Event </template>
      <template #body>
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="createEvent">
              Event Name
              <input
                required
                v-model="editable.name"
                type="text"
                class="col-12 bg-secondary text-light rounded"
                minlength="3"
                maxlength="50"
              />
              Start Date
              <input
                required
                v-model="editable.startDate"
                type="datetime-local"
                class="col-12 bg-secondary text-light rounded"
              />
              Capacity
              <input
                required
                v-model="editable.capacity"
                type="number"
                class="col-12 bg-secondary text-light rounded"
                min="20"
                max="1000"
              />
              Description
              <input
                required
                v-model="editable.description"
                type="text"
                class="col-12 bg-secondary text-light rounded"
                minlength="10"
                maxlength="50"
              />
              Location
              <input
                required
                v-model="editable.location"
                type="text"
                class="col-12 bg-secondary text-light rounded"
                minlength="10"
                maxlength="50"
              />
              Event Cover Image Link
              <input
                required
                v-model="editable.coverImg"
                type="text"
                class="col-12 bg-secondary text-light rounded"
              />
              Event type
              <select
                required
                v-model="editable.type"
                type="text"
                class="col-12 bg-secondary text-light rounded"
              >
                <option value="CONCERT">Concert</option>
                <option value="CONVENTION">Convention</option>
                <option value="SPORT">Sport</option>
                <option value="DIGITAL">Digital</option>
              </select>

              <div class="row p-3 mt-2">
                <button @click="createComment" class="col-12 btn btn-success">
                  Create!
                </button>
              </div>
            </form>
          </div>
        </div>
      </template>
    </Modal>
  </main>
  <footer></footer>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from './AppState'
import { eventsService } from "./services/EventsService";
import { logger } from "./utils/Logger";
import { useRouter } from "vue-router";
export default {
  name: 'App',
  setup() {
    const editable = ref({});
    const router = useRouter();
    return {
      editable,
      async createEvent() {
        try {
          const event = await eventsService.createEvent(editable.value)
          router.push({ name: "Events", params: { id: event.id } })
        } catch (error) {
          logger.error(error)
        }
      },
      appState: computed(() => AppState),
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.top {
  z-index: 100;
}
.hoverable:hover {
  filter: drop-shadow(0px 15px 10px rgba(0, 0, 0, 0.3));
  transition: 50ms ease-in-out;
  cursor: pointer;
}
.hoverable:active {
  transform: scale(0.98);
  transition: 50ms ease-in-out;
}
</style>
