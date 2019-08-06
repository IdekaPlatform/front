<template>
    <v-layout column id="project-news-details">
        <header>

        </header>
        <section>
            <div class="content" v-html="news.content"></div>
        </section>
    </v-layout>
</template>

<script>
export default {
    name: 'project-news-details',

    async asyncData({ app, params }) {
        return {
            news: await app.$repositories.project.getNews(params.slug, params.id.split('-').shift()),
        };
    },

    beforeMount() {
        this.$store.commit('setPageTitle', this.news.title);
    }
}
</script>

<style lang="less" scoped>
    #project-news-details {
        & > section {
            & > .content {
                
            }
        }
    }
</style>
