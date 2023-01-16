import filters from "@/helpers/filters";
export default {
  install(app) {
    app.config.globalProperties.$title = function (titleKey) {
      const appName = process.env.VUE_APP_TITLE;
      return `${filters.localizeFilter(titleKey)} | ${appName}`;
    };
  },
};
