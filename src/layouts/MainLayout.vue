<template>
  <div>
    <div class="app-main-layout">
      <v-navbar @changeIsOpen="isOpen = !isOpen"></v-navbar>
      <v-sidebar :isOpen="isOpen"></v-sidebar>

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link to="/record" class="btn-floating btn-large blue" href="#">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import vNavbar from "@/components/app/vNavbar.vue";
import vSidebar from "@/components/app/vSidebar.vue";
export default {
  name: "main-layout",
  components: {
    vNavbar,
    vSidebar,
  },
  data() {
    return {
      isOpen: true,
    };
  },
};
</script>
