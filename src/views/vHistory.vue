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
      <v-history-table :records="items"></v-history-table>
      <paginate
        v-model="page"
        :page-count="pageCount"
        :page-range="pageSize"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        page-class="waves-effect"
        container-class="pagination"
        :click-handler="handlePageChange"
      ></paginate>
    </section>
  </div>
</template>

<script>
import vLoader from "@/components/app/vLoader.vue";
import vHistoryTable from "@/components/vHistoryTable.vue";
import paginationMixin from "@/mixins/pagination.mixin";
import { mapActions } from "vuex";

export default {
  name: "v-history",
  data() {
    return {
      loading: true,
      records: [],
    };
  },
  components: {
    vLoader,
    vHistoryTable,
  },
  mixins: [paginationMixin],
  methods: {
    ...mapActions(["FETCH_CATEGORIES", "FETCH_RECORDS"]),
  },
  async mounted() {
    const categories = await this.FETCH_CATEGORIES();
    this.records = await this.FETCH_RECORDS();
    this.setupPagination(
      this.records.map((rec) => {
        return {
          ...rec,
          categoryName: categories.find((c) => c.id === rec.categoryId).title,
          typeClass: rec.type === "income" ? "green" : "red",
          typeText: rec.type === "income" ? "Доход" : "Расход",
        };
      })
    );

    this.loading = false;
  },
};
</script>
