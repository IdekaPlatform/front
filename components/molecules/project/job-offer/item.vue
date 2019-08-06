<template>
    <v-list-item :to="`/projects/${jobOffer.project.slug}/job-offers/${jobOffer.id}`" :class="['job-offer', { highlighted: isActive }]">
        <v-list-item-content>
            <v-list-item-title>{{ jobOffer.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ jobOffer.created_at }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action v-if="isProjectMember">
            <v-btn icon>
                <v-icon>delete</v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'job-offer',
    
    props: ['jobOffer', 'isActive'],

    computed: {
        ...mapGetters({
            user: 'user/user'
        }),

        isProjectMember() {
            if (this.user === null) {
                return false
            }
            for (const project of this.user.projects) {
                if (this.jobOffer.project.id === project.id) {
                    return true
                }
            }
            return false
        }
    }
}
</script>

<style lang="less">
    .job-offer {
        cursor:pointer;
    }
</style>
