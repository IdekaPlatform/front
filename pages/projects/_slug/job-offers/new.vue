<template>
    <v-layout column>
        <job-offer-form :project="project" />
    </v-layout>
</template>

<script>
import JobOfferForm from '~/components/organisms/project/job-offer/form';

export default {
    name: 'page-new-job-offer',
    
    async asyncData({ app, params }) {
        return {
            project: await app.$repositories.project.get(params.slug)
        }
    },

    components: {
        JobOfferForm
    },

    beforeMount() {
        this.$store.commit('breadcrumbs', {
            [this.project.name]: `/projects/${this.project.slug}`,
            [this.$i18n.t('project.team')]: `/projects/${this.project.slug}/team`,
            [this.$i18n.t('project.job_offers.new')]: '#'
        });
    },
}
</script>

<style lang="less" scoped>

</style>
