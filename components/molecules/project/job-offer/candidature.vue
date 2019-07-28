<template>
    <div class="candidature">
        <avatar :user="candidature.user" />
    </div>
</template>

<script>
import Avatar from '~/components/atoms/user/avatar';

export default {
    name: 'project-job-offer-candidature',

    props: ['candidature'],

    components: {
        Avatar
    }
}
</script>
