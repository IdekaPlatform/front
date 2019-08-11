<template>
    <div class="job-offer-form">
        <span class="text-md-center title">Projet {{ project.name }} : nouvelle annonce de recrutement</span>
        <v-form v-model="valid">
            <v-text-field label="Titre" :rules="titleRules" v-model="title" required />
            <no-ssr>
                <ckeditor id="content" height="200px" v-model="content" :editor="editor" />
            </no-ssr>
            <v-btn :disabled="!valid" color="success" @click="validate">
                Créer
            </v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    name: 'job-offer-form',

    props: ['project'],

    data () {
        return {
            title: '',
            titleRules: [ v => !!v || 'Titre obligatoire'],
            content: '',
            valid: false,
        };
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
            this.$emit('validate', {
                title: this.title,
                content: this.content,
            });
        }
    }
}
</script>

<style lang="less" scoped>

</style>
