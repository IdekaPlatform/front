<template>
  <v-layout column justify-center align-center>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-layout>
          <project-card v-for="project in projects" :key="project.slug" :project="project" class="ma-3" />
      </v-layout>
  </v-layout>
</template>

<script>
import ProjectCard from '~/components/molecules/project/card'

export default {
  name: 'page-home',

  async asyncData ({ app }) {
    return {
      projects: await app.$repositories.project.getAll()
    }
  },

  beforeMount() {
    this.$store.commit('setPageTitle', 'Ideka')
  },

  components: {
    ProjectCard
  }
}
</script>

