<template>
    <v-layout column id="page-organization">
        <header>
            <social-networks :networks="organization.social_networks" />
            <h2>{{ organization.name }}</h2>
        </header>
        <section class="projects">
            <h3>Projets</h3>

            <div>
                <project-card v-for="p in projects" :key="p.id" :project="p" />
            </div>
        </section>
    </v-layout>
</template>

<script>
import ProjectCard from '~/components/molecules/project/card';
import SocialNetworks from '~/components/molecules/social/networks';
import h2p from 'html2plaintext';

export default {
    name: 'page-organization-details',

    async asyncData({ app, params }) {
        return {
            organization: await app.$repositories.organization.get(params.slug),
            projects: await app.$repositories.project.getOrganizationProjects({ slug: params.slug })
        };
    },

    head() {
        const meta = [
        {
            property: 'og:title',
            hid: 'og:title',
            content: this.organization.name
        },
        {
            property: 'og:description',
            hid: 'og:description',
            content: this.organization.short_description
        },
        {
            name: 'twitter:title',
            content: this.organization.name,
            hid: 'twitter:title'
        },
        {
            name: 'twitter:description',
            content: h2p(this.organization.short_description),
            hid: 'twitter:description'
        },
        {
            name: 'description',
            content: h2p(this.organization.short_description),
            hid: 'description'
        },
        ];
        return {
            title: this.organization.name,
            meta
        };
    },

    beforeMount() {
        this.$store.commit('breadcrumbs', {
            [this.organization.name]: `/organizations/${this.organization.slug}`
        });
    },

    components: {
        ProjectCard,
        SocialNetworks
    }
}
</script>

<style lang="less" scoped>
#page-organization {
    & > header {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > .social-networks {
            align-self: flex-end;
        }

        & > h2 {
            margin-top: 50px;
        }
    }

    & > .projects {
        margin-top: 100px;

        & > h3 {
            text-align:center;
        }

        & > div {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 20px;
        }
    }
}
</style>
