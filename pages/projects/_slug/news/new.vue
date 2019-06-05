<template>
    <v-app>
        <span class="text-md-center title">Projet {{ project.name }} : nouvelle actualité</span>
        <v-form  v-model="valid">
            <v-text-field label="Titre" :rules="titleRules" v-model="title" required />
            <no-ssr>
                <ckeditor id="content" height="200px" v-model="content" :editor="editor" />
            </no-ssr>
            <v-btn :disabled="!valid" color="success" @click="validate">
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
            await this.$repositories.project.createNews(this.project, this.title, this.content);

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