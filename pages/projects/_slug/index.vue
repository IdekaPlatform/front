<template>
  <v-layout justify-space-between>
    <v-flex column md4>
      <v-flex class="mb-2">
        <v-btn v-if="project.website_url" flat icon :href="project.website_url" target="_blank">
            <font-awesome-icon icon="link" size="2x" />
        </v-btn>
        <social-badge v-for="network in project.social_networks" :key="network.network" :network="network" size="2x" />
      </v-flex>
      <organization-card v-if="project.organization" :organization="project.organization" />
      <owner-card v-else :user="project.user" />
      <section class="mt-3">
        <v-card>
          <v-card-title>
            <h3 class="headline mb-0">Gestion</h3>
          </v-card-title>
          <v-list v-if="isProjectMember">
            <v-list-tile>
              <v-btn dark color="teal" :to="`/projects/${project.slug}/news/new`">
                <v-icon left>add</v-icon>
                Créer une news
              </v-btn>
            </v-list-tile>
            <v-list-tile>
              <v-btn dark color="teal" :to="`/projects/${project.slug}/job-offers/new`">
                <v-icon left>supervisor_account</v-icon>
                Recruter
              </v-btn>
            </v-list-tile>
          </v-list>
        </v-card>
        
        <div class="mt-3">
          {{ project.description }}
        </div>

      </section>
    </v-flex>
    <v-flex md8 class="mt-2 ml-4 mr-4">
      <h2>Actualités</h2>
      <v-card v-for="n in news" :key="n.id" :color="(!n.is_published) ? 'teal lighten-5' : null" class="mt-3">
        <v-alert v-if="!n.is_published" :value="true" icon="info" color="teal" outline>
          Cette nouvelle n'est pas publiée et n'est visible que par votre équipe
        </v-alert>
        <v-card-title>
          <h3 class="headline mb-0">{{ n.title }}</h3>
        </v-card-title>
        <v-card-text v-html="n.content"></v-card-text>
        <v-card-text>
            <span class="grey--text right">par {{ n.author.username }} le {{ n.updated_at }}</span>
        </v-card-text>
        <v-card-actions v-if="isProjectMember">
          <v-btn color="teal" flat :to="`/projects/${project.slug}/news/${n.id}-${n.slug}/edit`">Modifier</v-btn>
          <v-btn v-if="!n.is_published" color="teal" flat @click="publish(n)">Publier</v-btn>
          <v-btn v-else color="teal" flat @click="unpublish(n)">Dépublier</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import OrganizationCard from '~/components/molecules/organization/card'
import OwnerCard from '~/components/molecules/project/owner-card'
import SocialBadge from '~/components/atoms/social/badge'
import { mapGetters } from 'vuex'

export default {
  name: 'page-project-details',

  async asyncData ({ app, route }) {
    const [ project, news ] = await Promise.all([
      app.$repositories.project.get(route.params.slug),
      app.$repositories.project.getProjectNews({ slug: route.params.slug })
    ]);
    return { project, news }
  },

  beforeMount() {
    this.$store.commit('setPageTitle', this.project.name)
  },

  components: {
    OrganizationCard,
    OwnerCard,
    SocialBadge
  },

  computed: {
    ...mapGetters({
      user: 'user/user'
    }),

    isProjectMember() {
      if (this.user === null) {
        return false
      }
      for (const project of this.user.projects) {
        if (this.project.id === project.id) {
          return true
        }
      }
      return false
    }
  },

  methods: {
    async publish(news) {
      await this.$repositories.project.publishNews(news)

      news.is_published = true
    },

    async unpublish(news) {
      await this.$repositories.project.unpublishNews(news)

      news.is_published = false
    }
  }
}
</script>

<style scoped>
  h1 > img {
    width: 96px;
  }
</style>

