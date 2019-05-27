<template>
    <v-app>
        <span class="text-md-center title">Organisation</span>
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

            <v-select
                    v-model="select"
                    :items="status"
                    :rules="[v => !!v || 'Status obligatoire']"
                    label="Status"
                    required
            ></v-select>

            <v-text-field
                    v-model.number="number"
                    label="Nombre de collaborateurs"
                    required
                    type="number"
            ></v-text-field>

            <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
            ></v-text-field>
            <v-flex>

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
            </v-flex>

            <v-btn
                    :disabled="!valid"
                    color="success"
                    @click="validate"
            >
                Créer
            </v-btn>

        </v-form>
    </v-app>
</template>

<script>
import myUpload from 'vue-image-crop-upload'

export default {
    name: 'organization',

    components: {
      'my-upload': myUpload
    },

    data: () => ({
      valid: false,
      name: '',
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

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          alert('form valid')
        }
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
