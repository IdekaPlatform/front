<template>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >

      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Ideka
          </v-list-tile-title>
        </v-list-tile>
      </v-list>

      <v-list>
        <v-list-tile
            to="/home"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>apps</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Welcome</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <organizations-list v-if="user" />
    </v-navigation-drawer>
</template>

<script>
import OrganizationsList from '~/components/organisms/organization/list';
import { mapGetters } from 'vuex';

export default {
    name: 'left-menu',

    components: {
      OrganizationsList
    },

    computed: {
        ...mapGetters({
            user: 'user/user'
        })
    }
}
</script>

