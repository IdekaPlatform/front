<template>
    <v-card class="elevation-12">
        <v-form ref="form" v-model="valid" @submit="signin">
            <v-toolbar dark color="bossanova">
                <v-toolbar-title>Connexion</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                    <v-layout wrap justify-center>
                        <v-flex ma-1>
                            <v-text-field
                                v-model="pseudo"
                                label="Pseudo"
                                color="purple"
                                required></v-text-field>
                        </v-flex>
                        <v-flex ma-1>
                            <v-text-field
                                v-model="password"
                                :rules="[v => !!v || 'Mot de passe obligatoire']"
                                label="Mot de passe"
                                type="password"
                                color="purple"
                                @keyup.enter="signin"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn to="/" class="purple--text">Retour</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" class="purple--text" @click="signin">Se connecter</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
    export default {
      name: 'signin',

      layout: 'login',

      data: () => ({
        items: [],
        pseudo: '',
        error: false,
        password: '',
        valid: false,
      }),

      methods: {
        async signin () {
            try {
                const data = await this.$repositories.user.login(this.pseudo, this.password);

                await this.$store.dispatch('user/storeToken', data);

                this.$store.commit('user/setUser', await this.$repositories.user.getMyInfos());
                const [ organizations, projects ] = await Promise.all([
                    this.$repositories.organization.getUserOrganizations(this.$store.getters['user/user']),
                    this.$repositories.project.getUserProjects(this.$store.getters['user/user'])
                ]);
                this.$store.commit('user/setOrganizations', organizations)
                this.$store.commit('user/setProjects', projects)
                this.$router.push('/');
            } catch(err) {
                this.$store.dispatch('notifications/add', {
                    type: 'error',
                    message: err.message
                })
            }
        }
      },
    }
</script>