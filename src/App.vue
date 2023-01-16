<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content}` : `SITE_NAME`
    }}</template>
  </metainfo>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { useMeta } from "vue-meta";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";

export default {
  name: "App",
  mounted() {
    useMeta({
      title: this.$title("ProfileTitle"),
      htmlAttrs: { lang: "en", amp: true },
    });
  },
  components: {
    EmptyLayout,
    MainLayout,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "./assets/styles/index.css";
.active-link {
  color: #42b983;
}

.exact-active-link {
  color: #42b983;
  font-weight: bold;
}
</style>
