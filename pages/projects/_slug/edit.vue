<template>
    <v-layout column id="page-edit-project">
        <project-form @validate="update($event)" :formData="project" />
    </v-layout>
</template>

<script>
import ProjectForm from '~/components/organisms/project/form';

export default {
    name: 'page-project-edition',

    async asyncData({ app, params }) {
        return {
            project: await app.$repositories.project.project.get(params.slug)
        };
    },

    components: {
        ProjectForm
    },

    beforeMount() {
        this.$store.commit('breadcrumbs', {
            [this.project.name]: `/projects/${this.project.slug}`,
            [this.$i18n.t('project.edit')]: '#'
        });
    },

    methods: {
        async update(data) {
            try {
                const project = await this.$repositories.project.project.update(this.project, data);
                this.$store.dispatch('notifications/add', {
                    type: 'success',
                    message: 'project.updated'
                });
                this.$router.push(`/projects/${project.slug}`);
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

<style lang="less" scoped>
#page-edit-project {
    width: 80%;
    margin: 50px auto;
}
</style>
