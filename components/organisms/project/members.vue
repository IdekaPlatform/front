<template>
    <div class="project-members">
        <header>
            <h2>Membres</h2>
        </header>
        <section>
            <project-member v-for="m in project.members" :key="m.id" :member="m" />
        </section>
        <footer>
            <v-btn :to="`/projects/${project.slug}/team`" v-if="!isProjectMember && jobOffers.length > 0">
                {{ project.name }} recrute ! ({{jobOffers.length}})
            </v-btn>
            <v-btn v-if="isProjectMember" dark color="bossanova" :to="`/projects/${project.slug}/team`">
                Recruter
            </v-btn>
        </footer>
    </div>
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
        padding-bottom: 40px;

        & > header {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 30px;
        }

        & > section {
            width: 80%;
            margin: auto;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 30px;
        }

        & > footer {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
        }
    }
</style>
