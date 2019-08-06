<template>
    <v-list-item class="skill-item">
        <v-list-item-content>
            <v-list-item-title>
                <h4>{{ skill.skill.name }}</h4>
            </v-list-item-title>
            <v-list-item-subtitle>
                <v-rating v-bind:value="skill.level / 2"
                    @input="update($event)"
                    half-increments
                    hover
                    color="bossanova"
                    :readonly="!canModify" />
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
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