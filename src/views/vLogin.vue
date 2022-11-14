<template>
  <form class="card auth-card" @submit.prevent="submitForm()">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          v-model="email"
          :class="{
            invalid: v$.email.$error,
          }"
          type="text"
          class="validate"
        />
        <label for="email">Email</label>
        <span v-if="v$.email.$error" class="helper-text invalid">
          {{ v$.email.$errors[0].$message }}
        </span>
      </div>
      <div class="input-field">
        <input
          id="password"
          v-model="password"
          :class="{
            invalid: v$.password.$error,
          }"
          type="password"
          class="validate"
        />
        <label for="password">Пароль</label>
        <span v-if="v$.password.$error" class="helper-text invalid">
          {{ v$.password.$errors[0].$message }}
        </span>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { mapActions } from "vuex";
import messages from "@/utils/messages";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  methods: {
    ...mapActions(["LOGIN"]),
    async submitForm() {
      this.v$.$validate(); // checks all inputs

      if (!this.v$.$error) {
        // if ANY fail validation
        const formData = {
          email: this.email,
          password: this.password,
        };

        try {
          await this.LOGIN(formData);
          this.$router.push("/");
          // eslint-disable-next-line no-empty
        } catch (error) {}
      }
    },
  },
  mounted() {
    if (messages[this.$route.query.message])
      this.$message(messages[this.$route.query.message]);
  },
  validations() {
    return {
      email: {
        email: helpers.withMessage("Это не емайл", email),
        required: helpers.withMessage(
          "Поле обязательно к заполнению",
          required
        ),
      },
      password: {
        required: helpers.withMessage(
          "Поле обязательно к заполнению",
          required
        ),
        minLength: helpers.withMessage(
          "Поле должно быть не менее 8 символов",
          minLength(8)
        ),
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
