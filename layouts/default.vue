<template>
  <v-app>
    <left-menu :clipped="clipped" :drawer="drawer" :miniVariant="miniVariant" :fixed="fixed" />
    <top-toolbar :clipped="clipped"
          :miniVariant="miniVariant"
          @switchDrawer="drawer = !drawer"
          @switchMiniVariant="miniVariant = !miniVariant"
          @switchClipped="clipped = !clipped"
          @switchFixed="fixed = !fixed"
          />
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LeftMenu from '~/components/organisms/menu/left';
import TopToolbar from '~/components/organisms/menu/top-toolbar';

export default {
    data () {
        return {
            clipped: false,
            drawer: true,
            timeBar: 50,
            fixed: false,
            miniVariant: false,
            right: true,
            rightDrawer: false
        }
    },

    components: {
        LeftMenu,
        TopToolbar,
    }
}
</script>
