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
    }
}
</script>
