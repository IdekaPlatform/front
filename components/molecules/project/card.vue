<template>
    <v-card class="project-card">
        <v-card-title class="headline">{{ project.name }}</v-card-title>
        <v-card-text>
          <p v-html="project.short_description"></p>
          <div class="text-xs-right">
            <em>
              <small v-if="project.organization">{{ project.organization.name }}</small>
              <small v-else>{{ project.user.username }}</small>
            </em>
          </div>
          <hr class="my-3">
          <span>{{ createdAt }}</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt :to="`/projects/${project.slug}`">Voir</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: 'project-card',

  props: ['project'],

  computed: {
    createdAt () {
      return this.$i18n.t('project.created_at', { created_at: (new Date(this.project.created_at)).toLocaleDateString('FR') })
    }
  }
}
</script>

<style lang="less" scoped>

</style>

