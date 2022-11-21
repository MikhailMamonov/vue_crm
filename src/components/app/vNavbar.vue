<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('changeIsOpen')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{
          $filters.dateFilter(date, "datetime")
        }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" href="#" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout()">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from "materialize-css";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null,
    };
  },
  computed: {
    ...mapGetters(["INFO"]),
    name() {
      return this.INFO.name;
    },
  },
  methods: {
    async logout() {
      await this.LOGOUT();
      this.$router.push("/login?message=logout");
    },
    ...mapActions(["LOGOUT"]),
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    });
  },

  beforeUnmount() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>

<style lang="scss"></style>
