<template>
    <v-navigation-drawer
    permanent
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      fixed
      app
    >

      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            <span v-if="!miniVariant">Ideka</span>
            <span v-else>I</span>
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

    props: ['clipped', 'drawer', 'fixed', 'miniVariant'],

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

