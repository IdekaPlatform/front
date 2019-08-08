<template>
    <v-card class="project-card">
        <v-card-title class="headline justify-center">
          <h4>{{ project.name }}</h4>
        </v-card-title>
        <v-card-text>
          <div class="text-center">
            <em>
              Par
              <span v-if="project.organization">{{ project.organization.name }}</span>
              <span v-else>{{ project.user.username }}</span>
            </em>
          </div>
          <p v-html="project.short_description"></p>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn text class="purple--text" nuxt :to="`/projects/${project.slug}`">Découvrir le projet</v-btn>
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
  .project-card {
    box-shadow: 0px 0px 5px rgba(0,0,0,0.6);
    font-family: Lato;
    max-width: 300px;

    & > .v-card__title {
      & > h4 {
        font-size: 1.4em;
        font-weight: normal;
        font-family: Lato !important;
      }
    }

    & > .v-card__text {
      & > div {
        font-size: 1.0em;
      }

      & > p {
        font-size: 1.1em;
        text-align: justify;
      }
    }
  }
</style>

