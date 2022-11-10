<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <vLoader v-if="loading"></vLoader>
    <div v-else class="row">
      <vHomeBill :rates="currency.rates"></vHomeBill>
      <vHomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      ></vHomeCurrency>
    </div>
  </div>
</template>

<script>
import vLoader from "@/components/app/vLoader.vue";
import vHomeBill from "@/components/vHomeBill.vue";
import vHomeCurrency from "@/components/vHomeCurrency.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loading: true,
      currency: null,
    };
  },
  name: "v-home",
  components: { vHomeBill, vHomeCurrency, vLoader },
  methods: {
    ...mapActions(["FETCH_CURRENCY"]),
    async refresh() {
      this.loading = true;
      this.currency = await this.FETCH_CURRENCY();
      this.loading = false;
    },
  },
  async mounted() {
    this.currency = await this.FETCH_CURRENCY();
    this.loading = false;
  },
};
</script>
