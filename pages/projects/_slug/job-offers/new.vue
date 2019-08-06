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
    }
}
</script>

<style lang="less" scoped>

</style>
