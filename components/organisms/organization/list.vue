<template>
    <v-list>
        <v-list-item>
            <v-list-item-title>
                <h3>Mes organisations</h3>
            </v-list-item-title>
            <v-list-item-action>
                <v-btn to="/organizations/new" text icon>
                    <v-icon>add</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-list-item v-for="organization in user.organizations" :key="organization.slug" :to="`/organizations/${organization.slug}`">
            <v-list-item-content>
                {{ organization.name }}
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'organizations-list',

    computed: {
        ...mapGetters({
            user: 'user/user'
        })
    }
}
</script>
