<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <Pie :chart-data="chartData" />
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
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "v-history",
  data() {
    return {
      loading: true,
      records: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20, 12],
          },
        ],
      },
    };
  },
  components: {
    vLoader,
    vHistoryTable,
    Pie,
  },
  mixins: [paginationMixin],
  methods: {
    ...mapActions(["FETCH_CATEGORIES", "FETCH_RECORDS"]),
    setup(categories) {
      const labels = categories.map((c) => c.title);
      const newData = categories.map((category) => {
        return this.records.reduce((total, rec) => {
          if (rec.categoryId === category.id && rec.type === "outcome") {
            total += +rec.amount;
          }
          return total;
        }, 0);
      });
      this.chartData.labels = labels;
      this.chartData.datasets = [
        {
          label: "Расходы по категориям",
          backgroundColor: [
            "#17A589",
            "#CB4335",
            "#D4AC0D",
            "#8E44AD",
            "#A5C8ED",
          ],
          data: newData,
        },
      ];

      console.log(this.chartData);
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
    },
  },
  async mounted() {
    const categories = await this.FETCH_CATEGORIES();
    this.records = await this.FETCH_RECORDS();
    this.setup(categories);
    this.loading = false;
  },
};
</script>
