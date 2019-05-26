<template>
    <v-list>
        <v-list-tile>
            <v-list-tile-title>
                <h3>Mes organisations</h3>
            </v-list-tile-title>
            <v-list-tile-action>
                <v-btn to="/organizations/new" flat icon>
                    <v-icon>add</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="organization in organizations" :key="organization.slug" :to="`/organizations/${organization.slug}`">
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
