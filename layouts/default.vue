<template>
  <v-app>
    <left-menu v-if="user" :miniVariant="miniVariant" />
    <top-toolbar @switchMiniVariant="miniVariant = !miniVariant" />
    <v-content>
      <v-container fluid class="pa-0">
        <nuxt />
      </v-container>
    </v-content>
    <notifications />
  </v-app>
</template>

<script>
import LeftMenu from '~/components/organisms/menu/left';
import TopToolbar from '~/components/organisms/menu/top-toolbar';
import Notifications from '~/components/organisms/notifications';
import { mapGetters } from 'vuex';

export default {
    data () {
        return {
            miniVariant: false,
        }
    },

    components: {
        LeftMenu,
        TopToolbar,
        Notifications
    },

    computed: {
      ...mapGetters({
        user: 'user/user'
      })
      
    }
}
</script>

<style lang="less" scoped>
.notifications {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
