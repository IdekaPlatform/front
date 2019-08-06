<template>
    <v-flex class="social-networks mb-2">
        <v-btn v-if="website" text icon :href="website" target="_blank">
            <font-awesome-icon icon="link" size="2x" />
        </v-btn>
        <social-badge v-for="network in networks" :key="network.network" :network="network" size="2x" />
    </v-flex>
</template>

<script>
import SocialBadge from '~/components/atoms/social/badge';

export default {
    name: 'social-networks',

    props: ['website', 'networks'],

    components: {
        SocialBadge
    }
}
</script>

