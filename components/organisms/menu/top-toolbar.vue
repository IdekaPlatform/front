<template>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click="$emit('switchDrawer')"></v-toolbar-side-icon>
      <v-btn icon @click.stop="$emit('switchMiniVariant')">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="$emit('switchClipped')">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="$emit('switchFixed')">
        <v-icon>remove</v-icon>
      </v-btn>
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

    props: ['title', 'clipped', 'miniVariant'],

    computed: {
        ...mapGetters({
            user: 'user/user'
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
