<template>
    <v-list-tile class="skill-item">
        <v-list-tile-content>
            <v-list-tile-title>
                <h4>{{ skill.skill.name }}</h4>
            </v-list-tile-title>
            <v-list-tile-sub-title>
                <v-rating v-bind:value="skill.level / 2"
                    @input="update($event)"
                    half-increments
                    hover
                    :readonly="!canModify" />
            </v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
export default {
    name: 'skill-item',

    props: ['skill', 'canModify'],
    
    methods: {
        update(level) {
            if (!this.canModify) {
                return;
            }
            this.skill.level = level * 2;

            this.$emit('updateSkill', this.skill);
        }
    }
}
</script>