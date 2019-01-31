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
                                                  type="password"
                                                  v-model="password"
                                                  :append-icon="viewPassword ? 'fa-eye' : 'fa-eye-slash'"
                                                  @click:append="() => (viewPassword = !viewPassword)"
                                                  :type="viewPassword ? 'text' : 'password'"
                                                  :rules="passwordRules"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="secondary" to="/signup">Inscription</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn @click="googleLogIn" class="loginButton google"><v-icon left color="#0057e7">fab fa-google</v-icon>Se connecter</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn @click="twitterLogIn" class="loginButton twitter">Se connecter<v-icon right color="#1da1f2">fab fa-twitter</v-icon></v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" type="submit" :disabled="!valid" @click="login">Login</v-btn>
                            </v-card-actions>
                        </v-card>
</template>

<script>
    import firebase from 'firebase'
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
            this.$router.push('/home')
          }
        },
        googleLogIn () {
          this.googleProvider = new firebase.auth.GoogleAuthProvider()
          firebase.auth().signInWithPopup(this.googleProvider).then(result => {
            console.log(result)
            this.$router.push('/home')
          }).catch(e => {
            this.$snotify.error(e.message)
            console.log(e)
          })
        },
        twitterLogIn () {
          this.twtterProvider = new firebase.auth.TwitterAuthProvider()
          firebase.auth().signInWithPopup(this.twtterProvider).then(result => {
            console.log(result)
            this.$router.push('/home')
          }).catch(e => {
            console.log(e)
          })
        }
      }
    }
</script>

<style>

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
</style>
