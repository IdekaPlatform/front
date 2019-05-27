<template>
    <v-app>
        <span class="text-md-center title">Votre nouveau projet</span>
        <v-form
                ref="form"
                v-model="valid"
        >
            <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Nom"
                    required
            ></v-text-field>


            <v-select v-if="user.organizations"
                    v-model="organization"
                    :items="user.organizations"
                    item-text="name"
                    item-value="id"
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
                Créer
            </v-btn>
        </v-form>
    </v-app>
</template>

<script>
import myUpload from 'vue-image-crop-upload'
import { mapGetters } from 'vuex'

export default {
    name: 'new-project-page',

    components: {
      'my-upload': myUpload
    },

    data: () => ({
      valid: false,
      name: '',
      websiteUrl: '',
      organization: null,
      shortDescription: '',
      description: '',
      show: false,
      imgDataUrl: null,
      nameRules: [
        v => !!v || 'Nom obligatoire'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail obligatoire',
        v => /.+@.+/.test(v) || 'E-mail doit être valide'
      ],
      select: null,
      checkbox: false
    }),

    computed: {
      ...mapGetters({
        user: 'user/user'
      })
    },

    methods: {
      async validate () {
        if (!this.valid) {
          return
        }
        const project = await this.$repositories.project.create(
          this.name,
          this.organization,
          this.shortDescription,
          this.description,
          this.websiteUrl
        )
        this.$store.commit('user/addProject', project);
        this.$router.push(`/projects/${project.slug}`)
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
    }
}
</script>

<style scoped>

</style>
