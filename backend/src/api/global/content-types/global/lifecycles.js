module.exports = {
    afterCreate() {
      strapi.config.index.rebuildDOApp()
    },
    afterCreateMany() {
      strapi.config.index.rebuildDOApp()
    },
    afterUpdate() {
      strapi.config.index.rebuildDOApp()
    },
    afterUpdateMany() {
      strapi.config.index.rebuildDOApp()
    },
    afterDelete(){
      strapi.config.index.rebuildDOApp()
    },
    afterDeleteMany(){
      strapi.config.index.rebuildDOApp()
    },
};
