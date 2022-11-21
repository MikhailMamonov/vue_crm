<template>
  <div>
    <vLoader v-if="loading" />
    <div class="app-main-layout" v-else>
      <v-navbar @changeIsOpen="isOpen = !isOpen"></v-navbar>
      <v-sidebar :isOpen="isOpen" :key="locale"></v-sidebar>

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          to="/record"
          class="btn-floating btn-large blue"
          href="#"
          v-tooltip="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import vLoader from "@/components/app/vLoader.vue";
import vNavbar from "@/components/app/vNavbar.vue";
import vSidebar from "@/components/app/vSidebar.vue";
import messages from "@/utils/messages";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "main-layout",
  components: {
    vNavbar,
    vSidebar,
    vLoader,
  },
  data() {
    return {
      isOpen: true,
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["INFO", "ERROR"]),
    locale() {
      return this.INFO.locale;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    },
  },
  methods: {
    ...mapActions(["FETCH_INFO"]),
  },
  async mounted() {
    if (!Object.keys(this.INFO).length) {
      await this.$store.dispatch("FETCH_INFO");
    }
    this.loading = false;
  },
};
</script>
