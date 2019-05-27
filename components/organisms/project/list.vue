<template>
    <v-list>
        <v-list-tile>
            <v-list-tile-title>
                <h3>Mes projets</h3>
            </v-list-tile-title>
            <v-list-tile-action>
                <v-btn to="/projects/new" flat icon>
                    <v-icon>add</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="project in user.projects" :key="project.slug" :to="`/projects/${project.slug}`">
            <v-list-tile-content>
                {{ project.name }}
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'projects-list',

    computed: {
        ...mapGetters({
            user: 'user/user'
        })
    }
}
</script>
