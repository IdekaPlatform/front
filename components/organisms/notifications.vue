<template>
    <div class="notifications">
        <transition-group name="notification" tag="div">
            <v-alert
                class="notification"
                v-for="(n, i) in notifications"
                :key="`notif-${i}`"
                :outlined="n.type === 'error'"
                dense
                :type="n.type">
                {{ $t(n.message) }}
            </v-alert>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: 'notifications',

    computed: {
        notifications() {
            return this.$store.state.notifications.notifications;
        }
    }
}
</script>

<style lang="less" scoped>
    #notifications {
        & > div {
            display: flex;
            align-items: center;
            flex-direction: column-reverse;
        }
    }

    .notification {
        transition: all 1s;
        margin: 5px 0px;
        padding: 10px 20px;
        font-size: 1.2em;
    }
    .notification-enter, .notification-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
    .notification-leave-active {
        position: absolute;
    }
</style>