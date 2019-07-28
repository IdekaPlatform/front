<template>
    <div class="member">
        <header>
            <nuxt-link :to="`/profile/${member.user.username}`" :title="member.user.username">
                <img v-if="member.user.avatar" :src="`/images/avatars/${member.user.avatar}`" />
                
                <font-awesome-icon v-else icon="user" size="3x" />
            </nuxt-link>
        </header>
    </div>
</template>

<script>
export default {
    name: 'project-member',

    props: ['member']
}
</script>
