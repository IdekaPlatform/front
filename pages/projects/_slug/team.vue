<template>
    <v-app>
        <v-layout row>
            <!-- <v-flex xs6>
                <job-offer-form v-if="selectedJobOffer === null" :project="project" />
                <job-offer v-else :jobOffer="selectedJobOffer" :skills="skills" />
            </v-flex> -->
            <v-flex xs4>
                <job-offers :jobOffers="jobOffers"
                    @selectJobOffer="selectedJobOffer = $event" :selectedJobOffer="selectedJobOffer"
                    @unselectJobOffer="selectedJobOffer = null" />
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
import JobOffer from '~/components/organisms/project/job-offer/details';
import JobOfferForm from '~/components/organisms/project/job-offer/form';
import JobOffers from '~/components/organisms/project/job-offer/list';

export default {
    name: 'project-team',

    components: {
        JobOffer,
        JobOfferForm,
        JobOffers
    },

    data() {
        return {
            selectedJobOffer: null
        };
    },

    async asyncData ({ app, params }) {
        const [ project, jobOffers, skills ] = await Promise.all([
            app.$repositories.project.get(params.slug),
            app.$repositories.project.getProjectJobOffers({ slug: params.slug }),
            app.$repositories.skill.getAll()
        ])
        return { project, jobOffers, skills };
    }
}
</script>

<style lang="less">
    .ck-editor__editable {
        min-height: 200px;
    }
</style>