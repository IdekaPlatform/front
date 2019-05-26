<template>
    <v-btn flat icon :href="network.url" target="_blank">
        <font-awesome-icon :icon="icon" :size="size" />
    </v-btn>
</template>

<script>
export default {
  name: 'social-badge',

  props: ['network', 'size'],

  computed: {
    icon () {
      return {
        discord: ['fab', 'discord'],
        facebook: ['fab', 'facebook-f'],
        twitter: ['fab', 'twitter'],
        mastodon: ['fab', 'mastodon'],
        linkedin: ['fab', 'linkedin'],
        instagram: ['fab', 'instagram'],
        github: ['fab', 'github'],
        gitlab: ['fab', 'gitlab']
      }[this.network.network]
    }
  }
}
</script>
