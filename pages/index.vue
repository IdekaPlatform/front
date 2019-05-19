<template>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Ideka</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field prepend-icon="person"
                                                  name="pseudo"
                                                  label="Pseudo"
                                                  type="text"
                                                  v-model="pseudo"
                                                  :rules="pseudoRules"
                                    ></v-text-field>
                                    <v-text-field id="password"
                                                  prepend-icon="lock"
                                                  name="password"
                                                  label="Mot de passe"
                                                  v-model="password"
                                                  :append-icon="viewPassword ? 'fa-eye' : 'fa-eye-slash'"
                                                  @click:append="() => (viewPassword = !viewPassword)"
                                                  :type="viewPassword ? 'text' : 'password'"
                                                  :rules="passwordRules"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-layout row>
                                    <v-flex row ma-2>
                                        <v-btn @click="twitterLogIn" class="loginButton twitter">Login<v-icon right color="#1da1f2">fab fa-twitter</v-icon></v-btn>
                                        <v-btn @click="googleLogIn" class="loginButton google"><v-icon left color="#0057e7">fab fa-google</v-icon>Login</v-btn>
                                    </v-flex>
                                    <v-flex row ma-2 class="text-sm-right">
                                        <v-btn color="secondary" to="/signup">Inscription</v-btn>
                                        <v-btn color="primary" type="submit" :disabled="!valid" @click="login">Login</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card-actions>
                        </v-card>
</template>

<script>
    export default {
      layout: 'login',
      data: () => ({
        pseudo: '',
        password: '',
        viewPassword: false,
        valid: false,
        logged: false,
        loggedIn: '',
        passwordRules: [
          v => !!v || 'The password is required',
          v => v.length >= 6 || 'Le mot de passe doit contenir au minimum 6 characters'
        ],
        pseudoRules: [
          v => !!v || 'Pseudo obligatoire',
          v => v.length >= 6 || 'Le Pseudo doit contenir au minimum 6 characters'
        ]
      }),
      methods: {
        login () {
          if (this.valid) {
            localStorage.loggedIn = true
            this.$router.push('/home')
          }
        }
      },
      created: function () {
      }
    }
</script>

<style scoped>

    .loginButton {
        background-color: transparent !important;
        border: 1px solid currentColor;
        box-shadow: none;
    }

    .google {
        color: #0057e7 !important;
    }

    .twitter {
        color: #1da1f2 !important;
    }

    .v-btn {
        margin-bottom: 5px !important;
    }
</style>
