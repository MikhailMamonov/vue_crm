<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>12 212</h4>
    </div>
    <v-loader v-if="loading" />
    <p v-else-if="!categories.length">
      Категорий пока нет
      <router-link to="/">Добавить новую категорию</router-link>
    </p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ $filters.currencyFilter(cat.spend) }} из
          {{ $filters.currencyFilter(cat.limit) }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="cat.progressColor"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import vLoader from "@/components/app/vLoader.vue";
import { mapActions } from "vuex";

export default {
  name: "v-planning",
  data() {
    return {
      categories: [],
      loading: true,
    };
  },
  components: {
    vLoader,
  },
  methods: {
    ...mapActions(["FETCH_CATEGORIES", "FETCH_RECORDS"]),
  },
  async mounted() {
    const categoires = await this.FETCH_CATEGORIES();
    const records = await this.FETCH_RECORDS();

    this.categories = categoires.map((cat) => {
      const spend = records
        .filter((rec) => rec.categoryId === cat.id)
        .filter((rec) => rec.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);
      const percent = (spend * 100) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        progressPercent < 60 ? "green" : percent < 100 ? "yellow" : "red";
      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue <= 0 ? "Превышение на" : "Осталось"
      } ${this.$filters.currencyFilter(Math.abs(tooltipValue))}`;
      return { ...cat, progressPercent, progressColor, spend, tooltip };
    });
    this.loading = false;
  },
};
</script>
