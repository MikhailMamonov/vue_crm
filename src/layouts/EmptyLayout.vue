<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import messages from "@/utils/messages";

export default {
  computed: {
    ...mapGetters(["ERROR"]),
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    },
  },
};
</script>
