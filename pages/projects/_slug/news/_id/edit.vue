<template>
    <v-app>
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
    </v-app>
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
            app.$repositories.project.get(params.slug),
            app.$repositories.project.getNews(params.slug, params.id.split('-')[0])
        ]);
        return { project, id: news.id, title: news.title, content: news.content }
    },

    beforeMount() {
        this.$store.commit('breadcrumbs', {
            [this.project.name]: `/projects/${this.project.slug}`,
            [this.new.title]: `/projects/${this.project.slug}/news/${this.news.id}-${this.news.slug}`,
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
            await this.$repositories.project.updateNews(this.project, this.id, this.title, this.content);

            this.$router.push(`/projects/${this.project.slug}`);
        }
    }
}
</script>

<style lang="less">
    .ck-editor__editable {
        min-height: 200px;
    }
</style>