<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md6>
                        <nuxt/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <notifications />
    </v-app>
</template>

<script>
import Notifications from '~/components/organisms/notifications';
export default {
    name: 'login',

    components: {
        Notifications
    }
}
</script>

<style scoped>
    .notifications {
        position: absolute;
        width: 60%;
        top: 0px;
        left: 20%;
    }
</style>
