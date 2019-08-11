<template>
    <v-layout column id="page-new-project">
        <span class="text-md-center title">Votre nouveau projet</span>
        
        <project-form @validate="create($event)" />
    </v-layout>
</template>

<script>
import ProjectForm from '~/components/organisms/project/form';
import myUpload from 'vue-image-crop-upload'
import { mapGetters } from 'vuex'

export default {
    name: 'new-project-page',

    components: {
      ProjectForm
    },

    beforeMount() {
        this.$store.commit('breadcrumbs', {
            [this.$i18n.t('project.new')]: '#'
        });
    },

    methods: {
      async create (data) {
        try {
          const project = await this.$repositories.project.create(data);
          this.$store.dispatch('notifications/add', {
            type: 'success',
            message: 'project.created'
          });
          this.$store.commit('user/addProject', project);
          this.$router.push(`/projects/${project.slug}`)
        } catch(err) {
          this.$store.dispatch('notifications/add', {
            type: 'error',
            message: err.message
          })
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

<style lang="less" scoped>
#page-new-project {
  width: 80%;
  margin: 20px auto;
}
</style>
