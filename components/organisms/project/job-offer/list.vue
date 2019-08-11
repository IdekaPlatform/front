<template>
    <v-card class="job-offers">
        <v-toolbar color="bossanova" dark>
            <v-toolbar-title>Annonces en cours</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn v-if="isProjectMember" icon :to="`/projects/${project.slug}/job-offers/new`">
                <v-icon>add</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list>
            <job-offer v-for="jobOffer in jobOffers" :key="jobOffer.id" :jobOffer="jobOffer" />
        </v-list>
    </v-card>
</template>

<script>
import JobOffer from '~/components/molecules/project/job-offer/item';
import { mapGetters } from 'vuex';

export default {
    name: 'job-offers-list',

    props: ['project', 'jobOffers'],

    components: {
        JobOffer
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

</style>
