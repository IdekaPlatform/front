<template>
    <div class="candidatures">
        <header>
            <h3>Candidatures</h3>
        </header>
        <section>
            <candidature v-for="c in candidatures" :key="c.id" :candidature="c" @click.native="selectedCandidature = c"/>
        </section>
        <footer v-if="selectedCandidature">
            <h3>{{ selectedCandidature.user.username }}</h3>

            <v-btn @click="accept()">
                Accepter
            </v-btn>
            <v-btn @click="decline()">
                Décliner
            </v-btn>
        </footer>
    </div>
</template>

<script>
import Candidature from '~/components/molecules/project/job-offer/candidature';

export default {
    name: 'candidatures',

    props: ['candidatures'],

    data() {
        return {
            selectedCandidature: null
        };
    },

    components: {
        Candidature
    },

    methods: {
        async accept() {
            await this.$repositories.project.acceptCandidature(this.selectedCandidature);
        },

        async decline() {
            await this.$repositories.project.declineCandidature(this.selectedCandidature);
        }
    }
}
</script>

<style lang="less" scoped>
    .candidatures {
        & > header {

        }

        & > section {
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>
