<template>
    <v-card class="organization-card">
        <v-card-title>
            <div>
                <h3 class="headline mb-0">{{ organization.name }}</h3>
                <div v-html="organization.short_description"></div>
            </div>
        </v-card-title>

        <v-card-actions>
            <v-btn flat color="blue" :to="`/organizations/${organization.slug}`">
                {{ $t('organization.see') }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: 'organization-card',

  props: ['organization']
}
</script>
