<template>
    <v-card class="project-members">
        <v-card-title>
            <h3>Membres</h3>
        </v-card-title>
        <v-card-text class="list">
            <project-member v-for="m in project.members" :key="m.id" :member="m" />
        </v-card-text>
        <v-card-actions>
            <v-btn :to="`/projects/${project.slug}/team`" v-if="!isProjectMember && jobOffers.length > 0">
                {{ project.name }} recrute ! ({{jobOffers.length}})
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import ProjectMember from '~/components/molecules/project/member';
import { mapGetters } from 'vuex';

export default {
    name: 'project-members',

    props: ['project', 'jobOffers'],

    components: {
        ProjectMember
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
    .project-members {
        & > .list {
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>
