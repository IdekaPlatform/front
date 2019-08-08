<template>
    <v-layout column id="page-user">
        <header>
            <h3>
                <avatar :user="user" />
                {{ user.username }}
            </h3>
        </header>
    </v-layout>
</template>

<script>
import Avatar from '~/components/atoms/user/avatar';

export default {
    name: 'page-profile',
    
    async asyncData({ app, params }) {
        return {
            user: await app.$repositories.user.get(params.username)
        };
    },

    components: {
        Avatar
    }
}
</script>

<style lang="less" scoped>
    #page-user {
        margin-top: 50px;
        
        & > header {
            & > h3 {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
    }
</style>
