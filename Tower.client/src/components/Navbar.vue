<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex p-0 flex-column align-items-center">
        <h1 title="Navigate to homepage" class="text-warning d-flex text-align">
          <span class="d-flex p-2 align-items-center justify-content-center">
            <div
              v-if="account.id !== undefined"
              data-bs-toggle="modal"
              data-bs-target="#addEventModal"
              title="start an event"
              class="btn btn-warning me-2 text-dark rounded-circle"
            >
              <i class="mdi mdi-power fs-4"></i>
            </div>
          </span>
          T O W E R
          <p></p>
        </h1>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div
      class="collapse d-flex justify-content-end navbar-collapse"
      id="navbarText"
    >
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
