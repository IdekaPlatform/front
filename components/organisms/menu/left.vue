<template>
    <v-navigation-drawer
    permanent
      :mini-variant.sync="miniVariant"
      fixed
      app
    >

      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            <img src="/images/circle_logo.png" />
            <span v-if="!miniVariant">Ideka</span>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>

      <v-list>
        <v-list-tile to="/" router exact>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Accueil</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <organizations-list :organizations="user.organizations" />
      <projects-list :projects="user.projects" />
    </v-navigation-drawer>
</template>

<script>
import OrganizationsList from '~/components/organisms/organization/list';
import ProjectsList from '~/components/organisms/project/list';
import { mapGetters } from 'vuex';

export default {
    name: 'left-menu',

    props: ['miniVariant'],

    components: {
      OrganizationsList,
      ProjectsList
    },

    computed: {
        ...mapGetters({
            user: 'user/user'
        })
    }
}
</script>

