<template>
    <div class="projects-panorama deep-purple lighten-3">
        <header>
            <h2>Projets</h2>
        </header>
        <section>
            <project-card v-for="project in projects" :key="project.slug" :project="project" class="ma-3" />
        </section>
        <footer>
            <v-btn dark class="purple darken-2">
                Explorer nos projets
            </v-btn>
        </footer>
    </div>
</template>

<script>
import ProjectCard from '~/components/molecules/project/card';

export default {
    name: 'projects-panorama',
    
    props: ['projects'],

    components: {
        ProjectCard
    }
}
</script>

<style lang="less" scoped>
    @import '~less/variables.less';

    .projects-panorama {
        & > header {
            text-align: center;
            padding: 20px;

            & > h2 {
                color: @bossanova;
            }
        }

        & > section {
            display: flex;
            flex-wrap: wrap;
            width: 80%;
            margin: auto;
        }

        & > footer {
            padding-top: 20px;
            padding-bottom: 50px;
            display: flex;
            justify-content: center;
        }
    }
</style>
