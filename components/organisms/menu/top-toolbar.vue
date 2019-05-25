<template>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="user" @click="logout">Logout</v-btn>
      <template v-else>
          <v-btn to="/signin" color="primary">Connexion</v-btn>
          <v-btn to="/register">Inscription</v-btn>
        </template>
    </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'top-toolbar',

    data () {
        return {
        clipped: false,
        drawer: true,
        timeBar: 50,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Ideka'
        }
    },

    computed: {
        ...mapGetters({
            user: 'user/user'
        })
    }
}
</script>
