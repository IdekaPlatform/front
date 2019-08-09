<template>
    <v-form class="project-form" v-model="valid">
         <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nom"
                required />


        <v-select v-if="user.organizations"
                v-model="organization"
                :items="user.organizations"
                item-text="name"
                item-value="slug"
                label="Organisation"
                required />
        <i>En laissant le champ organisation vide, vous devenez à titre personnel le gestionnaire de ce projet</i>
        
        <v-textarea v-model="shortDescription" label="Introduction" required />

        <v-textarea v-model="description" label="Description" required />

        <!-- <v-flex>

            <my-upload field="img"
                    @crop-success="cropSuccess"
                    @crop-upload-success="cropUploadSuccess"
                    @crop-upload-fail="cropUploadFail"
                    lang-type="fr"
                    v-model="show"
                    :width="300"
                    :height="300"
                    url="/upload"
                    :params="params"
                    :headers="headers"
                img-format="png"></my-upload>
                <img :src="imgDataUrl">
                Logo <v-btn @click="toggleShow" icon><v-icon>fas fa-user-circle</v-icon></v-btn>
        </v-flex> -->

        <v-text-field v-model="websiteUrl" label="Site web" />

        <v-btn :disabled="!valid" color="success" @click="validate">
          {{ $t('project.save') }}
        </v-btn>
    </v-form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'project-form',

    props: ['formData'],

    data() {
      return {
        valid: false,
        name: (this.formData.name) ? this.formData.name : '',
        websiteUrl: (this.formData.website_url) ? this.formData.website_url : '',
        organization: (this.formData.organization) ? this.formData.organization : null,
        shortDescription: (this.formData.short_description) ? this.formData.short_description : '',
        description: (this.formData.description) ? this.formData.description : '',
        show: false,
        imgDataUrl: null,
        nameRules: [
          v => !!v || 'Nom obligatoire'],
        select: null,
        checkbox: false
      };
    },

    computed: {
      ...mapGetters({
        user: 'user/user'
      })
    },

    methods: {
      validate () {
        if (!this.valid) {
          return
        }
        this.$emit('validate', {
          name: this.name,
          organization: this.organization,
          shortDescription: this.shortDescription,
          description: this.description,
          websiteUrl: this.websiteUrl
        });
      },
    }
}
</script>

<style lang="less" scoped>

</style>
