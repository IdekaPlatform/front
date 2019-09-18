<template>
    <v-layout column id="project-news-details">
        <header>
            <h3>{{ news.title }}</h3>
            <nuxt-link class="author" :to="`/profile/${news.author.username}`">
                <avatar :user="news.author" />
                {{ news.author.username }}
            </nuxt-link>
            <div class="date">
                <em v-if="published_at !== null">
                    Publié le {{ new Date(news.published_at).toLocaleDateString('fr-FR', { hour: 'numeric', minute: 'numeric' })}}
                </em>
                <em v-else>
                    Créé le {{ new Date(news.created_at).toLocaleDateString('fr-FR', { hour: 'numeric', minute: 'numeric' }) }}
                </em>
            </div>
        </header>
        <section>
            <div class="content" v-html="news.content"></div>
        </section>
    </v-layout>
</template>

<script>
import Avatar from '~/components/atoms/user/avatar';
import h2p from 'html2plaintext';

export default {
    name: 'project-news-details',

    async asyncData({ app, params }) {
        return {
            news: await app.$repositories.project.news.getNews(params.slug, params.id.split('-').shift()),
        };
    },

    head() {
        const description = h2p(this.news.content).subword(100) + '...';
        const meta = [
        {
            property: 'og:title',
            hid: 'og:title',
            content: this.news.title
        },
        {
            property: 'og:description',
            hid: 'og:description',
            content: description
        },
        {
            property: 'og:type',
            hid: 'og:type',
            content: 'article'
        },
        {
            property: 'author',
            hid: 'author',
            content: this.news.author.username,
        },
        {
            property: 'article:author',
            hid: 'article:author',
            content: this.news.author.username,
        },
        {
            property: 'article:published_time',
            hid: 'article_published_time',
            content: this.news.published_at,
        },
        {
            property: 'article:modified_time',
            hid: 'article.modified_time',
            content: this.news.updated_at
        },
        {
            name: 'twitter:title',
            content: this.news.title,
            hid: 'twitter:title'
        },
        {
            name: 'twitter:description',
            content: description,
            hid: 'twitter:description'
        },
        {
            name: 'description',
            content: description,
            hid: 'description'
        },
        ];
        return {
            title: this.news.title,
            meta
        };
    },

    beforeMount() {
        this.$store.commit('breadcrumbs', {
            [this.news.project.name]: `/projects/${this.news.project.slug}`,
            [this.news.title]: `/projects/${this.news.project.slug}/news/${this.news.id}-${this.news.slug}`
        });
    },

    components: {
        Avatar
    }
}
</script>

<style lang="less" scoped>
    @import '~less/variables.less';

    #project-news-details {
        & > header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 50px;

            & > h3 {
                color: @bossanova;
                font-size: 1.5em;
            }

            & > .author {
                display: flex;
                align-items: center;
                margin: 10px 0px;
                text-decoration: none;
                color: grey;

                & > .avatar {
                    margin-right: 10px;
                }
            }

            & > .date {
                color: grey;
            }
        }

        & > section {
            & > .content {
                width: 60%;
                margin: 20px auto;
                padding: 20px 40px;
                box-shadow: 0px 2px 5px rgba(0,0,0,0.6);
                font-size: 1.2em;
                font-variant: small-caps;
                color: grey;
            }
        }
    }
</style>
