<template>
    <div class="avatar" :title="user.username">
        <img v-if="user.avatar" :src="`/images/avatars/${user.avatar}`" />

        <font-awesome-icon v-else icon="user" size="3x" />
    </div>
</template>

<script>
export default {
    name: 'user-avatar',

    props: ['user']
}
</script>

<style lang="less" scoped>
    .avatar {
        width: 54px;
        height: 54px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
    }
</style>

