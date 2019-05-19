<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <project-card v-for="project in projects" :key="project.slug" :project="project" />
    </v-flex>
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

  components: {
    ProjectCard
  }
}
</script>

