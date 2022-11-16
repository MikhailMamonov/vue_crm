<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <v-loader v-if="loading" />
    <p v-else-if="!records.length">
      Записей пока нет
      <router-link to="/">Добавить новую запись</router-link>
    </p>
    <section v-else>
      <v-history-table :records="records"></v-history-table>
    </section>
  </div>
</template>

<script>
import vLoader from "@/components/app/vLoader.vue";
import vHistoryTable from "@/components/vHistoryTable.vue";
import { mapActions } from "vuex";

export default {
  name: "v-history",
  data() {
    return {
      loading: true,
      records: [],
      categories: [],
    };
  },
  components: {
    vLoader,
    vHistoryTable,
  },
  methods: {
    ...mapActions(["FETCH_CATEGORIES", "FETCH_RECORDS"]),
  },
  async mounted() {
    this.categories = await this.FETCH_CATEGORIES();
    const records = await this.FETCH_RECORDS();

    this.records = records.map((rec) => {
      return {
        ...rec,
        categoryName: this.categories.find((c) => c.id === rec.categoryId)
          .title,
        typeClass: rec.type === "income" ? "green" : "red",
        typeText: rec.type === "income" ? "Доход" : "Расход",
      };
    });

    this.loading = false;
  },
};
</script>
