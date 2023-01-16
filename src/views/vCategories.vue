<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <vLoader v-if="loading"></vLoader>
      <div v-else class="row">
        <vCategoryCreate @created="addToCategories"></vCategoryCreate>
        <vCategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategory"
        ></vCategoryEdit>
        <p v-else>Категорий пока нет.</p>
      </div>
    </section>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import vLoader from "@/components/app/vLoader.vue";
import vCategoryCreate from "@/components/category/vCategoryCreate.vue";
import vCategoryEdit from "@/components/category/vCategoryEdit.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0,
    };
  },
  components: {
    vCategoryCreate,
    vCategoryEdit,
    vLoader,
  },
  methods: {
    ...mapActions(["FETCH_CATEGORIES"]),
    addToCategories(category) {
      this.categories.push(category);
    },
    updateCategory(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
  },
  async mounted() {
    useMeta({
      title: this.$title("Menu_Categories"),
      htmlAttrs: { lang: "en", amp: true },
    });
    this.categories = await this.FETCH_CATEGORIES();
    this.loading = false;
  },
};
</script>
