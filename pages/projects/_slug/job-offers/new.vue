<template>
    <v-layout column>
        <job-offer-form :project="project" @validate="create($event)" />
    </v-layout>
</template>

<script>
import JobOfferForm from '~/components/organisms/project/job-offer/form';

export default {
    name: 'page-new-job-offer',
    
    async asyncData({ app, params }) {
        return {
            project: await app.$repositories.project.project.get(params.slug)
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

    methods: {
        async create(data) {
            try {
                const jobOffer = await this.$repositories.project.job_offer.createJobOffer(this.project, data.title, data.content);

                this.$store.dispatch('notifications/add', {
                    type: 'success',
                    message: 'project.job_offer.created'
                });
                this.$router.push(`/projects/${this.project.slug}/job-offers/${jobOffer.id}`);
            } catch(err) {
                this.$store.dispatch('notifications/add', {
                    type: 'error',
                    message: err.message
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .job-offer-form {
        width: 80%;
        margin: 50px auto;
    }
</style>
