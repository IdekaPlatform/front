<template>
  <v-layout id="project-page" column>
    <header>
      <social-networks :networks="project.social_networks" :website="project.website_url" />
      
      <h1>
        {{ project.name }}
        <v-btn v-if="isProjectMember" icon :to="`/projects/${project.slug}/edit`">
          <v-icon>edit</v-icon>
        </v-btn>
      </h1>

      <div class="mt-3 description">
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
import h2p from 'html2plaintext';
import { mapGetters } from 'vuex';

export default {
  name: 'page-project-details',

  head() {
    const meta = [
      {
        property: 'og:title',
        hid: 'og:title',
        content: this.project.name
      },
      {
        property: 'og:description',
        hid: 'og:description',
        content: this.project.short_description
      },
      {
        name: 'twitter:title',
        content: this.project.name,
        hid: 'twitter:title'
      },
      {
        name: 'twitter:description',
        content: h2p(this.project.short_description),
        hid: 'twitter:description'
      },
      {
        name: 'description',
        content: h2p(this.project.short_description),
        hid: 'description'
      },
    ];
    return {
      title: this.project.name,
      meta
    };
  },

  async asyncData ({ app, route }) {
    const [ project, news, jobOffers ] = await Promise.all([
      app.$repositories.project.project.get(route.params.slug),
      app.$repositories.project.news.getProjectNews({ slug: route.params.slug }),
      app.$repositories.project.job_offer.getProjectJobOffers({ slug: route.params.slug })
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

    & > .description {
      max-width: 60%;
      text-align: justify;
    }
  }
}
</style>

