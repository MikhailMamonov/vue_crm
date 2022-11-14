<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitForm()">
        <div class="input-field">
          <input
            id="name"
            v-model="title"
            :class="{
              invalid: v$.title.$error,
            }"
            type="text"
          />
          <label for="name">Название</label>
          <span v-if="v$.title.$error" class="helper-text invalid">{{
            v$.title.$errors[0].$message
          }}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            v-model.number="limit"
            :class="{
              invalid: v$.limit.$error,
            }"
            type="number"
          />
          <label for="limit">Лимит</label>
          <span v-if="v$.limit.$error" class="helper-text invalid">{{
            v$.limit.$errors[0].$message
          }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, helpers } from "@vuelidate/validators";
import M from "materialize-css";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: "",
      limit: 1,
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      title: {
        required: helpers.withMessage(
          "Поле обязательно к заполнению",
          required
        ),
      },
      limit: {
        required: helpers.withMessage(
          "Поле обязательно к заполнению",
          required
        ),
        minValue: helpers.withMessage(
          "Минимальное значение 100",
          minValue(100)
        ),
      },
    };
  },
  methods: {
    ...mapActions(["CREATE_CATEGORY"]),
    async submitForm() {
      this.v$.$validate(); // checks all inputs

      if (!this.v$.$error) {
        // if ANY fail validation
        const formData = {
          title: this.title,
          limit: this.limit,
        };

        try {
          const category = await this.CREATE_CATEGORY(formData);

          this.title = "";
          this.limit = 100;
          // reset form validation errors
          this.v$.$reset();
          this.$message("Категория была успешно добавлена");
          this.$emit("created", category);
          // eslint-disable-next-line no-empty
        } catch (error) {}
      }
    },
  },
  mounted() {
    M.updateTextFields();
  },
};
</script>

<style lang="scss" scoped></style>
