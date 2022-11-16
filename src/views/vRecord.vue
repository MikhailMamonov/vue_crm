<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <v-loader v-if="loading" />
    <p v-else-if="!categories.length">
      Категорий пока нет
      <router-link to="/">Добавить новую категорию</router-link>
    </p>
    <form v-else class="form" @submit.prevent="submitForm">
      <div class="input-field">
        <select select ref="select" v-model="category">
          <option v-for="c of categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          :class="{
            invalid: v$.amount.$error,
          }"
          v-model.number="amount"
        />
        <label for="amount">Сумма</label>
        <span v-if="v$.amount.$error" class="helper-text invalid">{{
          v$.amount.$errors[0].$message
        }}</span>
        <span class="helper-text invalid">amount пароль</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          :class="{
            invalid: v$.description.$error,
          }"
          v-model="description"
        />
        <label for="description">Описание</label>
        <span v-if="v$.description.$error" class="helper-text invalid">{{
          v$.description.$errors[0].$message
        }}</span>
        <span class="helper-text invalid">description пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, helpers } from "@vuelidate/validators";
import vLoader from "@/components/app/vLoader.vue";
import M from "materialize-css";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-record",
  components: {
    vLoader,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      loading: true,
      categories: [],
      select: null,
      category: null,
      type: "income",
      amount: 100,
      description: "",
    };
  },
  computed: {
    ...mapGetters(["INFO"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      } else {
        return this.INFO.bill >= this.amount;
      }
    },
  },

  methods: {
    ...mapActions(["FETCH_CATEGORIES", "CREATE_RECORD", "UPDATE_INFO"]),
    async submitForm() {
      this.v$.$validate(); // checks all inputs

      if (!this.v$.$error) {
        if (this.canCreateRecord) {
          await this.CREATE_RECORD({
            categoryId: this.category,
            type: this.type,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON(),
          });

          const bill =
            this.type === "income"
              ? this.INFO.bill + this.amount
              : this.INFO.bill - this.amount;
          await this.UPDATE_INFO({ bill });
          this.$message("Запись успешно создана");
          this.v$.$reset();
          this.amount = 1;
          this.description = "";
        } else {
          this.$message(
            `Недостаточно средств на счете, доступно ${this.INFO.bill}`
          );
        }
      }
    },
  },
  validations() {
    return {
      description: {
        required: helpers.withMessage(
          "Поле обязательно к заполнению",
          required
        ),
      },
      amount: {
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
  async mounted() {
    this.categories = await this.FETCH_CATEGORIES();
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
