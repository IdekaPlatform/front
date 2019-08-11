<template>
    <v-app class="new-project-news">
        <v-form v-model="valid">
            <v-text-field label="Titre" :rules="titleRules" v-model="title" required color="purple" />
            <no-ssr>
                <ckeditor id="content" height="200px" v-model="content" :editor="editor" />
            </no-ssr>
            <v-btn :disabled="!valid" dark color="bossanova" @click="validate">
                Créer
            </v-btn>
        </v-form>
    </v-app>
</template>

<script>
export default {
    page: 'new-project-news',

    data () {
        return {
            title: '',
            titleRules: [ v => !!v || 'Titre obligatoire'],
            content: '',
            valid: false,
        };
    },

    async asyncData ({ app, params }) {
        return {
            project: await app.$repositories.project.get(params.slug)
        }
    },

    beforeMount() {
        this.$store.commit('breadcrumbs', {
            [this.project.name]: `/projects/${this.project.slug}`,
            [this.$i18n.t('project.news.new')]: '#'
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
                await this.$repositories.project.createNews(this.project, this.title, this.content);

                this.$store.dispatch('notifications/add', {
                    type: 'success',
                    message: 'project.news.created'
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

    .new-project-news {
        width: 90%;
        margin: 20px auto;
    }
</style>