<template>
    <v-layout class="job-offer-details">
        <v-flex xs4>
            <v-card>
                <v-card-title>
                    <h3>Compétences</h3>
                </v-card-title>

                <v-list wrap>
                    <skill-item v-for="skill in jobOfferSkills" :key="skill.skill.name" :skill="skill" :canModify="true" @updateSkill="updateSkill($event)" />
                </v-list>

                <v-card-text>
                    <v-divider />
                    <v-subheader>Ajouter</v-subheader>
                    <v-select
                        :items="Object.keys(skills)"
                        v-model="selectedSkillType"
                         />
        
                    <v-select
                        v-if="selectedSkillType !== null"
                        v-model="selectedSkills"
                        :items="skills[selectedSkillType]"
                        multiple
                        item-text="name"
                        item-value="id"
                    />

                    <v-text-field v-if="selectedSkills.length > 0" v-model="level" />
                    <v-btn v-if="selectedSkills.length > 0" @click="createSkills">
                        <v-icon>add</v-icon>
                        Ajouter
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex offset-xs1 xs6>
            <header>
                <h2>
                    {{ jobOffer.title }}
                </h2>
            </header>
            {{ jobOffer.content }}
        </v-flex>
    </v-layout>
</template>

<script>
import SkillItem from '~/components/molecules/skill/item';

export default {
    name: 'job-offer-details',
    
    props: ['jobOffer', 'skills'],

    components: {
        SkillItem
    },

    data () {
        return {
            jobOfferSkills: this.jobOffer.skills,
            selectedSkillType: null,
            selectedSkills: [],
            level: 5,
        }
    },

    methods: {
        async createSkills() {
            const promises = [];

            for (const skillId of this.selectedSkills) {
                promises.push(this.$repositories.skill.create(this.jobOffer, skillId, this.level));
            }
            const skills = await Promise.all(promises);

            this.jobOfferSkills[this.selectedSkillType].push(...skills);
        },

        async updateSkill(skill) {
            await this.$repositories.project.updateJobOfferSkillLevel(this.jobOffer, skill);
        }
    }
}
</script>

<style lang="less" scoped>

</style>
