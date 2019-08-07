<template>
    <v-toolbar-title class="breadcrumbs">
        <nuxt-link to="/">
            <v-icon>home</v-icon>
        </nuxt-link>
        <div v-for="b in Object.keys(breadcrumbs)" :key="b">
            <v-icon>arrow_forward_ios</v-icon>
            <nuxt-link :to="breadcrumbs[b]">
                {{ b }}
            </nuxt-link>
        </div>
    </v-toolbar-title>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'breadcrumbs',
    
    computed: {
        ...mapGetters({
            breadcrumbs: 'breadcrumbs'
        })
    }
}
</script>

<style lang="less" scoped>
    @import '~less/variables.less';

    .breadcrumbs {
        display: flex;
        align-items: center;

        & > div {
            display: flex;
            align-items: center;

            & > a {
                text-decoration: none;
                color: white;
                transition: color 0.2s ease-out;

                &:hover {
                    color: @lavender;
                }
            }
        }
    }
</style>
