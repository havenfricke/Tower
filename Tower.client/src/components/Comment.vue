<template>
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
      :src="comment.creator.picture"
      alt=""
    />
    <h6 class="col-10">{{ comment.creator.name }}</h6>
    <div class="row">
      <p class="col-12 mt-3">
        {{ comment.body }}
      </p>
    </div>
    <div class="row d-flex justify-content-end">
      <i
        v-if="account.id == comment.creator.id"
        @click="deleteComment"
        title="delete comment"
        class="col-2 text-end mdi mdi-delete hoverable"
      ></i>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from "@vue/runtime-core"
import { commentsService } from "../services/CommentsService"
import { logger } from "../utils/Logger"
import { useRoute } from "vue-router"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    watchEffect(async () => {
      try {
        await commentsService.getEventComments(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      async deleteComment() {
        try {
          if (await Pop.confirm()) {
            await commentsService.deleteComment(props.comment.id)
          }
        } catch (error) {
          logger.error(error)
        }
      },
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style>
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