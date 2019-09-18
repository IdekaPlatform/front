<template>
    <v-layout column>
        <div class="news-form">
            <span class="text-md-center title">Projet {{ project.name }} : édition d'actualité</span>
            <v-form  v-model="valid">
                <v-text-field label="Titre" :rules="titleRules" v-model="title" required />
                <no-ssr>
                    <ckeditor id="content" height="200px" v-model="content" :editor="editor" />
                </no-ssr>
                <v-btn :disabled="!valid" color="success" @click="validate">
                    Mettre à jour
                </v-btn>
            </v-form>
        </div>
    </v-layout>
</template>

<script>
export default {
    page: 'new-project-news',

    data () {
        return {
            titleRules: [ v => !!v || 'Titre obligatoire'],
            valid: false,
        };
    },

    async asyncData ({ app, params }) {
        const [ project, news ] = await Promise.all([
            app.$repositories.project.project.get(params.slug),
            app.$repositories.project.news.getNews(params.slug, params.id.split('-')[0])
        ]);
        return { project, id: news.id, title: news.title, content: news.content }
    },

    beforeMount() {
        this.$store.commit('breadcrumbs', {
            [this.project.name]: `/projects/${this.project.slug}`,
            [this.id]: `/projects/${this.project.slug}/news/${this.id}-${this.slug}`,
            [this.$i18n.t('project.news.edit')]: '#'
        });
    },

    computed: {
        editor () {
            return (process.client) ? require('@ckeditor/ckeditor5-build-classic') : null;
        }
    },

    methods: {
        async validate () {
            if (!this.valid) {
                return false;
            }
            try {
                await this.$repositories.project.news.updateNews(this.project, this.id, this.title, this.content);

                this.$store.dispatch('notifications/add', {
                    type: 'success',
                    message: 'project.news.edited'
                });
                this.$router.push(`/projects/${this.project.slug}`);
            } catch(err) {
                this.$store.dispatch('notifications/add', {
                    type: 'error',
                    message: err.message
                });
            }
        }
    }
}
</script>

<style lang="less">
    .ck-editor__editable {
        min-height: 200px;
    }

    .news-form {
        width: 80%;
        margin: 50px auto;
    }
</style>