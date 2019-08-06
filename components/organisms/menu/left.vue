<template>
    <v-navigation-drawer
      class="left-menu blue-grey darken-4"
      permanent
      :mini-variant.sync="miniVariant"
      fixed
      app
      dark
    >

      <v-list>
        <v-list-item to="/" link nuxt active-class="inactive">
          <v-list-item-title class="title">
            <img src="/images/logo/circle_logo_64.png" />
            <span v-if="!miniVariant">Ideka</span>
          </v-list-item-title>
        </v-list-item>
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

<style lang="less" >
  @import '~less/variables.less';

  .left-menu {
    .title {
      display: flex;
      align-items: center;

      & > img {
        width: 48px;
        margin-right: 10px;
      }
    }

    .v-navigation-drawer__border {
        width: 4px;
        background-color: @bossanova !important;
    }

    .inactive {
      color: transparent !important;
    }
  }
</style>


