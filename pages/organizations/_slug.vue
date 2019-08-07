<template>
    <div>
        {{ organization.name }}
    </div>
</template>

<script>
export default {
    name: 'page-organization-details',

    async asyncData({ app, params }) {
        return {
            organization: await app.$repositories.organization.get(params.slug)
        };
    },

    beforeMount() {
        this.$store.commit('breadcrumbs', {
            [this.organization.name]: `/organizations/${this.organization.slug}`
        });
    },
}
</script>
