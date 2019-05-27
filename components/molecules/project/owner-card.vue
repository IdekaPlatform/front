<template>
    <v-card>
        <v-card-title>
            <div>
                <h3 class="headline mb-0">Gérant du projet</h3>
            </div>
        </v-card-title>
        <v-card-text>{{ user.username }}</v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'project-owner-card',

    props: ['user']
}
</script>
