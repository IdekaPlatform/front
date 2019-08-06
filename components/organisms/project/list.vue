<template>
    <v-list>
        <v-list-item>
            <v-list-item-title>
                <h3>Mes projets</h3>
            </v-list-item-title>
            <v-list-item-action>
                <v-btn to="/projects/new" text icon>
                    <v-icon>add</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-list-item v-for="project in user.projects" :key="project.slug" :to="`/projects/${project.slug}`">
            <v-list-item-content>
                {{ project.name }}
            </v-list-item-content>
        </v-list-item>
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
