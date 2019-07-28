<template>
    <v-list-tile active-class="highlighted" :class="['job-offer', { highlighted: isActive }]">
        <v-list-tile-content>
            <v-list-tile-title>{{ jobOffer.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ jobOffer.created_at }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action v-if="isProjectMember">
            <v-btn icon>
                <v-icon>delete</v-icon>
            </v-btn>
        </v-list-tile-action>
    </v-list-tile>
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

    .highlighted {
        background-color: rgba(0,0,0,0.1);
    }
</style>
