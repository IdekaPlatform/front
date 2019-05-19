<template>
    <v-layout column justify-center align-center>
      <header>
      <h1>
        <img :src="project.logo" :alt="project.name" />
        {{ project.name }}
      </h1>
      </header>
      <section>
        {{ project.description }}
      </section>
    </v-layout>
</template>

<script>
export default {
  name: 'page-project-details',

  async asyncData ({ app, route }) {
    return {
      project: await app.$repositories.project.get(route.params.slug)
    }
  }
}
</script>

<style scoped>
  h1 > img {
    width: 96px;
  }
</style>

