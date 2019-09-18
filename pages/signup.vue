<template>
    <v-card class="elevation-12">
        <v-form ref="form" v-model="valid">
            <v-toolbar dark color="secondary">
                <v-toolbar-title>Inscription</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-layout wrap justify-center>
                    <v-flex ma-1>
                        <v-text-field
                                v-model="pseudo"
                                :rules="pseudoRules"
                                label="Pseudo"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                append-icon="fas fa-envelope"
                                required
                        ></v-text-field>
                    </v-flex>
                    <v-flex ma-1>
                        <v-text-field
                                v-model="password"
                                :rules="[v => !!v || 'Mot de passe obligatoire']"
                                label="Mot de passe"
                                type="password"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="confirmPassword"
                                :rules="confirmPasswordRules"
                                :error="error"
                                label="Confirmation du mot de passe"
                                type="password"
                                required
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-checkbox
                        v-model="checkbox"
                        :rules="[v => !!v || 'Vous devez accepter les conditions d\'utilisation']"
                        label="j'ai lu et j'accepte les conditions d'utilisation."
                        required
                ></v-checkbox>
            </v-card-text>
            <v-card-actions>
                <v-btn to="/">Retour</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" @click="signup">S'inscrire</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
    export default {
      name: 'signup',
      layout: 'login',
      data: () => ({
        email: '',
        checkbox: false,
        items: [],
        pseudo: '',
        error: false,
        password: '',
        confirmPassword: '',
        valid: false,
        emailRules: [
          v => !!v || 'E-mail obligatoire',
          v => /.+@.+/.test(v) || 'E-mail non valide'
        ],
        confirmPasswordRules: [
          v => !!v || 'Confirmation de mot de passe obligatoire'
        ],
        pseudoRules: [v => !!v || 'Nom obligatoire']
      }),
      methods: {
        async signup () {
            try {
              const tokens = await this.$repositories.user.create(this.pseudo, this.email, this.password);

              await this.$store.dispatch('user/storeToken', tokens);
              this.$store.commit('user/setUser', await this.$repositories.user.getMyInfos());
              const [ organizations, projects ] = await Promise.all([
                  this.$repositories.organization.getUserOrganizations(this.$store.getters['user/user']),
                  this.$repositories.project.project.getUserProjects(this.$store.getters['user/user'])
              ]);
              this.$store.commit('user/setOrganizations', organizations)
              this.$store.commit('user/setProjects', projects)
              
              this.$router.push('/')
            } catch(err) {
              this.$store.dispatch('notifications/add', {
                type: 'success',
                message: err.message
              })
            }
        }
      },
      watch: {
        confirmPassword (newConfirmation) {
          this.error = newConfirmation !== this.password
        }
      }
    }
</script>