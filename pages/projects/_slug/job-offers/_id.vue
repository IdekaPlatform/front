<template>
    <v-layout column>
        <job-offer :jobOffer="jobOffer" :skills="skills" />
    </v-layout>
</template>

<script>
import JobOffer from '~/components/organisms/project/job-offer/details';
import JobOfferForm from '~/components/organisms/project/job-offer/form';

export default {
    name: 'page-job-offer-details',

    async asyncData({ app, params }) {
        const [ jobOffer, skills ] = await Promise.all([
            app.$repositories.project.getJobOffer({ slug: params.slug }, params.id),
            app.$repositories.skill.getAll()
        ])
        return { jobOffer, skills };
    },

    components: {
        JobOffer
    }
}
</script>

<style lang="less" scoped>

</style>
