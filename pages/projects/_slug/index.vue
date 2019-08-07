<template>
  <v-layout id="project-page" column>
    <header>
      <social-networks :networks="project.social_networks" :website="project.website_url" />
      
      <h1>{{ project.name }}</h1>

      <div class="mt-3">
        {{ project.description }}
      </div>
    </header>

    <project-news :project="project" :news="news" />

    <project-members :project="project" :jobOffers="jobOffers" />
  </v-layout>
</template>

<script>
import ProjectMembers from '~/components/organisms/project/members';
import ProjectNews from '~/components/organisms/project/news';
import OrganizationCard from '~/components/molecules/organization/card'
import OwnerCard from '~/components/molecules/project/owner-card'
import SocialNetworks from '~/components/molecules/social/networks'

export default {
  name: 'page-project-details',

  async asyncData ({ app, route }) {
    const [ project, news, jobOffers ] = await Promise.all([
      app.$repositories.project.get(route.params.slug),
      app.$repositories.project.getProjectNews({ slug: route.params.slug }),
      app.$repositories.project.getProjectJobOffers({ slug: route.params.slug })
    ]);
    return { project, news, jobOffers }
  },

  beforeMount() {
      this.$store.commit('breadcrumbs', {
          [this.project.name]: `/projects/${this.project.slug}`
      });
  },

  components: {
    ProjectNews,
    ProjectMembers,
    OrganizationCard,
    OwnerCard,
    SocialNetworks
  }
}
</script>

<style lang="less" scoped>
#project-page {
  & > header {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > .social-networks {
      align-self: flex-end;
    }

    & > h1 {
      font-size: 2.5em;

      & > img {
        width: 96px;
      }
    }

    & > p {
      max-width: 60%;
      text-align: justify;
    }
  }
}
</style>

