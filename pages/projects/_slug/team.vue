<template>
    <v-app>
        <job-offers :jobOffers="jobOffers"
            @selectJobOffer="selectedJobOffer = $event" :selectedJobOffer="selectedJobOffer"
            @unselectJobOffer="selectedJobOffer = null" />
    </v-app>
</template>

<script>
import JobOffers from '~/components/organisms/project/job-offer/list';
import { mapGetters } from 'vuex';

export default {
    name: 'project-team',

    components: {
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

<style lang="less">
    .ck-editor__editable {
        min-height: 200px;
    }
</style>