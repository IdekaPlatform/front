<template>
  <v-layout justify-space-between>
    <v-flex column md4>
      <header>
        <h1>
          {{ project.name }}
        </h1>
        <v-flex>
          <social-badge v-for="network in project.social_networks" :key="network.network" :network="network" size="2x" />
        </v-flex>
      </header>
      <organization-card v-if="project.organization" :organization="project.organization" />
    </v-flex>
    <v-flex md8 offset-md1>
      <section>
        {{ project.description }}

      </section>
    </v-flex>
  </v-layout>
</template>

<script>
import OrganizationCard from '~/components/molecules/organization/card'
import SocialBadge from '~/components/atoms/social/badge'

export default {
  name: 'page-project-details',

  async asyncData ({ app, route }) {
    return {
      project: await app.$repositories.project.get(route.params.slug)
    }
  },

  components: {
    OrganizationCard,
    SocialBadge
  }
}
</script>

<style scoped>
  h1 > img {
    width: 96px;
  }
</style>

