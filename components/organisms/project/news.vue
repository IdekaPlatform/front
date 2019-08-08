<template>
    <div class="project-news">
        <header>
            <h2>Actualités</h2>
            <v-btn v-if="isProjectMember" icon :to="`/projects/${project.slug}/news/edit`">
                <v-icon>add_circle_outline</v-icon>
            </v-btn>
        </header>
        <v-layout justify-center wrap>
            <project-news-card v-for="n in news" :key="n.id" :project="project" :news="n" />
        </v-layout>
    </div>
</template>

<script>
import ProjectNewsCard from '~/components/molecules/project/news-card';
import { mapGetters } from 'vuex';

export default {
    name: 'project-news',

    props: ['project', 'news'],

    components: {
        ProjectNewsCard
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
    },
}
</script>

<style lang="less" scoped>
    .project-news {
        padding-bottom: 40px;

        & > header {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;

            & > .v-btn {
                justify-self: flex-end;
            }
        }

        & > .layout {
            width: 90%;
            margin: auto;
            margin-top: 30px;
        }
    }
</style>

