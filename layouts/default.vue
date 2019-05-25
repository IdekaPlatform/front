<template>
  <v-app>
    <left-menu />
    <top-toolbar />
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
  middleware: 'authenticated',
  components: {
    LeftMenu,
    TopToolbar,
  },
  
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>
