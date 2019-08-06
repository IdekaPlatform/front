<template>
  <v-app>
    <left-menu v-if="user" :miniVariant="miniVariant" />
    <top-toolbar @switchMiniVariant="miniVariant = !miniVariant" />
    <v-content>
      <v-container fluid class="pa-0">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LeftMenu from '~/components/organisms/menu/left';
import TopToolbar from '~/components/organisms/menu/top-toolbar';
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
    },

    computed: {
      ...mapGetters({
        user: 'user/user'
      })
      
    }
}
</script>
