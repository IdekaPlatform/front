<template>
    <div class="member">
        <header>
            <v-btn :to="`/profile/${member.user.username}`" icon color="purple" :title="member.user.username">
                <img v-if="member.user.avatar" :src="`/images/avatars/${member.user.avatar}`" />
                
                <font-awesome-icon v-else icon="user" size="3x" />
            </v-btn>
        </header>
    </div>
</template>

<script>
export default {
    name: 'project-member',

    props: ['member']
}
</script>
