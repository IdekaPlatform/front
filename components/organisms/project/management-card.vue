<template>
    <v-card>
        <v-card-title>
        <h3 class="headline mb-0">Gestion</h3>
        </v-card-title>
        <v-list>
        <v-list-tile>
            <v-btn dark color="teal" :to="`/projects/${project.slug}/news/new`">
            <v-icon left>add</v-icon>
            Créer une news
            </v-btn>
        </v-list-tile>
        <v-list-tile>
            <v-btn dark color="teal" :to="`/projects/${project.slug}/team`">
            <v-icon left>supervisor_account</v-icon>
            Recruter
            </v-btn>
        </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
export default {
    name: 'project-management-card',
    
    props: ['project']
}
</script>

