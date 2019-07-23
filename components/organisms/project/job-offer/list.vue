<template>
    <v-card class="job-offers">
        <v-toolbar color="primary" dark>
            <v-toolbar-title>Annonces en cours</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn v-if="selectedJobOffer !== null" icon @click="$emit('unselectJobOffer')">
                <v-icon>add</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list>
            <job-offer v-for="jobOffer in jobOffers"
                :key="jobOffer.id"
                :jobOffer="jobOffer"
                :isActive="isActive(jobOffer)"
                @click.native="(!isActive(jobOffer)) ? $emit('selectJobOffer', jobOffer) : $emit('unselectJobOffer')" />
        </v-list>
    </v-card>
</template>

<script>
import JobOffer from '~/components/molecules/project/job-offer/item';

export default {
    name: 'job-offers-list',

    props: ['jobOffers', 'selectedJobOffer'],

    components: {
        JobOffer
    },

    methods: {
        isActive(jobOffer) {
            return jobOffer === this.selectedJobOffer;
        }
    }
}
</script>

<style lang="less" scoped>

</style>
