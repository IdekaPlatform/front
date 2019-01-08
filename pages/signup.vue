<template>
    <v-card class="elevation-12">
        <v-form
                ref="form"
                v-model="valid">
            <v-toolbar dark color="secondary">
                <v-toolbar-title>Inscription</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-layout wrap justify-center>
                    <v-flex ma-1>
                        <v-text-field
                                v-model="lastName"
                                :rules="[v => !!v || 'Prénom obligatoire']"
                                label="Prénom"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="firstName"
                                :rules="[v => !!v || 'Prénom obligatoire']"
                                label="Nom"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="organisation"
                                label="Entreprise"
                                append-icon="fas fa-building"
                        ></v-text-field>
                        <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                append-icon="fas fa-envelope"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="phoneNumber"
                                label="Numero de téléphone"
                                mask="##-##-##-##-##"
                                append-icon="fas fa-mobile"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model.number="age"
                                label="Age"
                                :rules="[v => !!v || 'Age obligatoire']"
                                mask="##"
                                required
                        ></v-text-field>
                    </v-flex>
                    <v-flex ma-1>
                        <v-text-field
                                v-model="pseudo"
                                :rules="[v => !!v || 'Nom obligatoire']"
                                label="Pseudo"
                                required
                        ></v-text-field>
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
        firstName: '',
        lastName: '',
        pseudo: '',
        error: false,
        password: '',
        confirmPassword: '',
        organisation: '',
        phoneNumber: '',
        age: '',
        valid: false,
        emailRules: [
          v => !!v || 'E-mail obligatoire',
          v => /.+@.+/.test(v) || 'E-mail non valide'
        ],
        confirmPasswordRules: [
          v => !!v || 'Confirmation de mot de passe obligatoire'
        ]
      }),
      methods: {
        signup () {
          // register acount in db
          this.$router.push('/')
        }
      },
      watch: {
        confirmPassword (newConfirmation) {
          this.error = newConfirmation !== this.password
        }
      }
    }
</script>

<style scoped>

</style>
