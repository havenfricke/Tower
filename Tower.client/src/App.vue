<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <Modal id="addEventModal">
      <template #title> Create an Event </template>
      <template #body>
        <div class="row">
          <div class="col-12">
            <form>
              Event Name
              <input
                type="text"
                class="col-12 bg-secondary text-light rounded"
              />
              Start Date
              <input
                type="date"
                class="col-12 bg-secondary text-light rounded"
              />
              Capacity
              <input
                type="number"
                class="col-12 bg-secondary text-light rounded"
              />
              Description
              <input
                type="text"
                class="col-12 bg-secondary text-light rounded"
              />
              Location
              <input
                type="text"
                class="col-12 bg-secondary text-light rounded"
              />
              Event Cover Image Link
              <input
                type="text"
                class="col-12 bg-secondary text-light rounded"
              />
              <div class="row p-3 mt-2">
                <button class="col-12 btn btn-success">Create!</button>
              </div>
            </form>
          </div>
        </div>
      </template>
    </Modal>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
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
