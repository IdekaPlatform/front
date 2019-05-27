<template>
  <v-layout justify-space-between>
    <v-flex column md4>
      <organization-card v-if="project.organization" :organization="project.organization" />
      <owner-card v-else :user="project.user" />
        <v-flex>
          <v-btn v-if="project.website_url" flat icon :href="project.website_url" target="_blank">
              <font-awesome-icon icon="link" size="2x" />
          </v-btn>
          <social-badge v-for="network in project.social_networks" :key="network.network" :network="network" size="2x" />
        </v-flex>
      <section>
        {{ project.description }}

      </section>
    </v-flex>
    <v-flex md8 offset-md1>
    </v-flex>
  </v-layout>
</template>

<script>
import OrganizationCard from '~/components/molecules/organization/card'
import OwnerCard from '~/components/molecules/project/owner-card'
import SocialBadge from '~/components/atoms/social/badge'

export default {
  name: 'page-project-details',

  async asyncData ({ app, route }) {
    return {
      project: await app.$repositories.project.get(route.params.slug)
    }
  },

  beforeMount() {
    this.$store.commit('setPageTitle', this.project.name)
  },

  components: {
    OrganizationCard,
    OwnerCard,
    SocialBadge
  }
}
</script>

<style scoped>
  h1 > img {
    width: 96px;
  }
</style>

