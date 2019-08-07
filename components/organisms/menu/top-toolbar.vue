<template>
    <v-app-bar app dark class="top-toolbar" color="bossanova">
      <v-app-bar-nav-icon v-if="user" @click="$emit('switchMiniVariant')"></v-app-bar-nav-icon>
      <breadcrumbs v-if="!isHomepage" />
      <v-spacer></v-spacer>

      <template v-if="user">
          <v-btn text>{{ user.username }}</v-btn>
          <v-btn @click="logout">Déconnexion</v-btn>
      </template>
      <template v-else>
          <v-btn to="/signin" class="purple darken-2">Connexion</v-btn>
          <v-btn to="/signup" light color="bossanova-text" class="ml-4">Inscription</v-btn>
        </template>
    </v-app-bar>
</template>

<script>
import Breadcrumbs from '~/components/molecules/menu/breadcrumbs';
import { mapGetters } from 'vuex';

export default {
    name: 'top-toolbar',

    components: {
        Breadcrumbs
    },

    computed: {
        ...mapGetters({
            user: 'user/user',
            title: 'pageTitle'
        }),

        isHomepage() {
            return this.$route.path === '/';
        }
    },

    methods: {
      async logout () {
        await this.$store.dispatch('user/logout');
        this.$router.push('/')
      }
    }
}
</script>