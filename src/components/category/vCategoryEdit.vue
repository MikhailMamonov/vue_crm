<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitForm()">
        <div class="input-field">
          <select select ref="select" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

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
          Обновить
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
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      select: null,
      title: "",
      limit: 1,
      current: null,
    };
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
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions(["UPDATE_CATEGORY"]),
    async submitForm() {
      this.v$.$validate(); // checks all inputs

      if (!this.v$.$error) {
        // if ANY fail validation
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };

        try {
          await this.UPDATE_CATEGORY(categoryData);

          this.$message("Категория была успешно обновлена");
          this.$emit("updated", categoryData);
          // eslint-disable-next-line no-empty
        } catch (error) {}
      }
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  watch: {
    current(curId) {
      const { title, limit } = this.categories.find((c) => c.id === curId);
      this.title = title;
      this.limit = limit;
    },
  },
};
</script>
