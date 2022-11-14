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
      <div class="input-field">
        <input
          id="name"
          v-model="name"
          :class="{
            invalid: v$.name.$error,
          }"
          type="text"
          class="validate"
        />
        <label for="name">Имя</label>
        <span v-if="v$.name.$error" class="helper-text invalid">
          {{ v$.name.$errors[0].$message }}
        </span>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model.trim="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { mapActions } from "vuex";
export default {
  name: "register-view",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false,
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  methods: {
    ...mapActions(["REGISTER"]),
    async submitForm() {
      this.v$.$validate();

      if (!this.v$.$error) {
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name,
        };

        try {
          await this.REGISTER(formData);
          this.$router.push("/");
          // eslint-disable-next-line no-empty
        } catch (error) {}
      }
    },
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
      name: {
        required: helpers.withMessage(
          "Поле обязательно к заполнению",
          required
        ),
      },
      agree: { checked: (v) => v },
    };
  },
};
</script>
