<template>
    <v-layout column id="team">
        <job-offers :project="project" :jobOffers="jobOffers" />
    </v-layout>
</template>

<script>
import JobOffers from '~/components/organisms/project/job-offer/list';
export default {
    name: 'project-team',

    components: {
        JobOffers
    },

    async asyncData ({ app, params }) {
        const [ project, jobOffers, skills ] = await Promise.all([
            app.$repositories.project.project.get(params.slug),
            app.$repositories.project.job_offer.getProjectJobOffers({ slug: params.slug }),
            app.$repositories.skill.getAll()
        ])
        return { project, jobOffers, skills };
    },

    beforeMount() {
        this.$store.commit('breadcrumbs', {
            [this.project.name]: `/projects/${this.project.slug}`,
            [this.$i18n.t('project.team')]: '#'
        });
    }
}
</script>

<style lang="less">
    .job-offers {
        width: 60%;
        margin: 50px auto;
    }

    .ck-editor__editable {
        min-height: 200px;
    }
</style>