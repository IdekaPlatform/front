<template>
    <v-app>
        <span class="text-md-center title">Organisation</span>
        <v-form
                ref="form"
                v-model="valid"
        >
            <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Nom"
                    required
            ></v-text-field>

            <v-select
                    v-model="select"
                    :items="status"
                    :rules="[v => !!v || 'Status obligatoire']"
                    label="Status"
                    required
            ></v-select>

            <v-text-field
                    v-model.number="number"
                    label="Nombre de collaborateurs"
                    required
                    type="number"
            ></v-text-field>

            <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
            ></v-text-field>

            <v-btn
                    :disabled="!valid"
                    color="success"
                    @click="validate"
            >
                Créer
            </v-btn>

        </v-form>
    </v-app>
</template>

<script>
    export default {
      name: 'organization',
      data: () => ({
        valid: false,
        name: '',
        number: '',
        nameRules: [
          v => !!v || 'Nom obligatoire'],
        email: '',
        emailRules: [
          v => !!v || 'E-mail obligatoire',
          v => /.+@.+/.test(v) || 'E-mail doit être valide'
        ],
        select: null,
        status: [
          'Status 1',
          'Status 2',
          'Status 3',
          'Status 4'
        ],
        checkbox: false
      }),

      methods: {
        validate () {
          if (this.$refs.form.validate()) {
            alert('form valid')
          }
        }
      }
    }
</script>

<style scoped>

</style>
