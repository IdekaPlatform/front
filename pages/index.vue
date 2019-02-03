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
                                <v-btn color="primary" type="submit" :disabled="!valid" @click="login">Login</v-btn>
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
