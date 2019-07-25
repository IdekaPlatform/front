<template>
    <v-toolbar app>
      <v-toolbar-side-icon v-if="user" @click="$emit('switchMiniVariant')"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>

      <template v-if="user">
          <v-btn flat>{{ user.username }}</v-btn>
          <v-btn @click="logout">Déconnexion</v-btn>
      </template>
      <template v-else>
          <v-btn to="/signin" color="primary">Connexion</v-btn>
          <v-btn to="/signup">Inscription</v-btn>
        </template>
    </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'top-toolbar',

    computed: {
        ...mapGetters({
            user: 'user/user',
            title: 'pageTitle'
        })
    },

    methods: {
      async logout () {
        await this.$store.dispatch('user/logout');
        this.$router.push('/')
      }
    }
}
</script>
