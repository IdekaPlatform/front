<template>
    <v-layout column id="page-new-organization">
        <span class="text-md-center title">Organisation</span>
        <v-form ref="form" v-model="valid">
            <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Nom"
                    required />

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
                Créer
            </v-btn>

        </v-form>
    </v-layout>
</template>

<script>
    import myUpload from 'vue-image-crop-upload'

    export default {
      name: 'new-organization-page',
      data: () => ({
        valid: false,
        name: '',
        shortDescription: '',
        description: '',
        websiteUrl: '',
        show: false,
        imgDataUrl: null,
        nameRules: [
          v => !!v || 'Nom obligatoire'],
      }),

    beforeMount() {
        this.$store.commit('breadcrumbs', {
            [this.$i18n.t('organization.new')]: '#'
        });
    },

      methods: {
        async validate () {
          if (!this.valid) {
            return
          }
          const organization = await this.$repositories.organization.create(this.name, this.shortDescription, this.description, this.websiteUrl);

          this.$store.commit('user/addOrganization', organization);

          this.$router.push(`/organizations/${organization.slug}`);
        },
        toggleShow () {
          this.show = !this.show
        },
        /**
           * crop success
           *
           * [param] imgDataUrl
           * [param] field
           */
        cropSuccess (imgDataUrl, field) {
          console.log('-------- crop success --------')
          this.imgDataUrl = imgDataUrl
        },
        /**
           * upload success
           *
           * [param] jsonData  server api return data, already json encode
           * [param] field
           */
        cropUploadSuccess (jsonData, field) {
          console.log('-------- upload success --------')
          console.log(jsonData)
          console.log('field: ' + field)
        },
        /**
           * upload fail
           *
           * [param] status    server api return error status, like 500
           * [param] field
           */
        cropUploadFail (status, field) {
          console.log('-------- upload fail --------')
          console.log(status)
          console.log('field: ' + field)
        }
      },
      components: {
        'my-upload': myUpload
      }
    }
</script>

<style lang="less" scoped>
#page-new-organization {
  width: 80%;
  margin: 20px auto;
}
</style>
