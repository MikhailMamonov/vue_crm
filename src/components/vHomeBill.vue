<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="cur of currencies" :key="cur" class="currency-line">
          <span>{{ $filters.currencyFilter(getCurrency(cur), cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    currencies: ["RUB", "USD", "EUR"],
  }),
  computed: {
    ...mapGetters(["INFO"]),
    base() {
      return this.INFO.bill / (this.rates["RUB"] / this.rates["EUR"]);
    },
  },
  props: {
    rates: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
  },
};
</script>
