<template>
    <v-list>
        <v-list-tile v-for="organization in organizations" :key="organization.slug">
            <v-list-tile-content>
                {{ organization.name }}
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
export default {
    name: 'organizations-list',

    props: ['organizations']
}
</script>
