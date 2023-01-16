<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter("ProfileTitle") }}</h3>
    </div>

    <form class="form" @submit.prevent="submitForm">
      <div class="input-field">
        <input
          id="description"
          :class="{
            invalid: v$.name.$error,
          }"
          type="text"
          v-model="name"
        />
        <label for="description">{{ $filters.localizeFilter("Name") }}</label>
        <span v-if="v$.name.$error" class="helper-text invalid">
          {{ v$.name.$errors[0].$message }}
        </span>
      </div>

      <!-- Switch -->
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $filters.localizeFilter("Update") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import M from "materialize-css";
import { useMeta } from "vue-meta";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      name: "",
      isRuLocale: true,
    };
  },
  computed: {
    ...mapGetters(["INFO"]),
  },
  mounted() {
    useMeta({
      title: this.$title("ProfileTitle"),
      htmlAttrs: { lang: "en", amp: true },
    });
    this.name = this.INFO.name;
    this.isRuLocale = this.INFO.locale === "ru-RU";
    setTimeout(() => {
      M.updateTextFields();
    });
  },
  methods: {
    ...mapActions(["UPDATE_INFO"]),
    async submitForm() {
      this.v$.$validate(); // checks all inputs

      if (!this.v$.$error) {
        try {
          await this.UPDATE_INFO({
            name: this.name,
            locale: this.isRuLocale ? "ru-RU" : "en-US",
          });
          // eslint-disable-next-line no-empty
        } catch (error) {}
      }
    },
  },
  validations() {
    return {
      name: {
        required: helpers.withMessage(
          "Поле обязательно к заполнению",
          required
        ),
      },
    };
  },
};
</script>

<style>
.switch {
  margin-bottom: 2rem;
}
</style>
