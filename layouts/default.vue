<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
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
      <v-btn
        icon
        @click="showMusic = !showMusic"
      >
        <v-icon v-html="showMusic ? 'fas fa-volume-up' : 'fas fa-music'"></v-icon>
      </v-btn>
      <v-btn @click="logout">Logout</v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <div class="text-xs-center">
      <v-bottom-sheet inset v-model="showMusic">
        <v-card tile>
          <v-list>
            <v-slider
                    :value="timeBar"
                    class="my-0"
                    height="3"
            ></v-slider>
            <v-list-tile>
              <v-img max-height="80px" max-width="80px" src="https://upload.wikimedia.org/wikipedia/en/thumb/4/42/BMTHMantra.jpg/220px-BMTHMantra.jpg" aspect-ratio="1" style="margin-right: 15px"></v-img>
              <v-list-tile-content>
                <v-list-tile-title>Mantra</v-list-tile-title>
                <v-list-tile-sub-title>Bring Me The Horizon</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-spacer></v-spacer>

              <v-list-tile-action>
                <v-btn icon>
                  <v-icon>fast_rewind</v-icon>
                </v-btn>
              </v-list-tile-action>

              <v-list-tile-action :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
                <v-btn icon>
                  <v-icon>pause</v-icon>
                </v-btn>
              </v-list-tile-action>

              <v-list-tile-action :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
                <v-btn icon>
                  <v-icon>fast_forward</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-spacer></v-spacer>
              <v-slider
                      v-model="volume"
                      prepend-icon="volume_up"
              ></v-slider>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-bottom-sheet>
    </div>
  </v-app>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {
      showMusic: false,
      clipped: false,
      drawer: true,
      timeBar: 50,
      volume: 50,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/home' },
        { icon: 'bubble_chart', title: 'Organisation', to: '/organization' },
        { icon: 'fas fa-play', title: 'Music Player', to: '/music' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Ideka'
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      console.log('toutou')
      this.$router.push('/')
    }
  }
}
</script>
