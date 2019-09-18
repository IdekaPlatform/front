<template>
    <v-layout class="job-offer-details">
        <v-flex xs4>
            <v-card>
                <v-card-title>
                    <h3>Compétences</h3>
                </v-card-title>

                <v-list wrap>
                    <skill-item v-for="skill in jobOfferSkills" :key="skill.skill.name" :skill="skill" :canModify="isProjectMember" @updateSkill="updateSkill($event)" />
                </v-list>

                <v-card-text v-if="isProjectMember">
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
            <section>
                <div v-html="jobOffer.content"></div>

                <candidatures class="mt-3" :candidatures="candidatures" />
            </section>
            <footer>
                <v-btn v-if="user && !isProjectMember" @click="createCandidature()">
                    Candidater
                </v-btn>
                <v-btn v-if="!user" to="/signin">
                    Connectez-vous pour candidater !
                </v-btn>
            </footer>
        </v-flex>
    </v-layout>
</template>

<script>
import Candidatures from '~/components/organisms/project/job-offer/candidatures';
import SkillItem from '~/components/molecules/skill/item';
import { mapGetters } from 'vuex';

export default {
    name: 'job-offer-details',
    
    props: ['jobOffer', 'skills'],

    components: {
        Candidatures,
        SkillItem
    },

    data () {
        return {
            jobOfferSkills: this.jobOffer.skills,
            selectedSkillType: null,
            selectedSkills: [],
            level: 5,
            candidatures: [] 
        }
    },

    async mounted() {
        this.candidatures = await this.$repositories.project.candidature.getCandidatures(this.jobOffer);
    },

    computed: {
        ...mapGetters({
            user: 'user/user'
        }),

        isProjectMember() {
            if (this.user === null) {
                return false
            }
            for (const project of this.user.projects) {
                if (this.jobOffer.project.id === project.id) {
                    return true
                }
            }
            return false
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
            await this.$repositories.project.job_offer.updateJobOfferSkillLevel(this.jobOffer, skill);
        },

        async createCandidature() {
            await this.$repositories.project.candidature.createCandidature(this.jobOffer);
        }
    }
}
</script>

<style lang="less" scoped>

</style>
