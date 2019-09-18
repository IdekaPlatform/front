<template>
  <v-layout column>
      <header class="landing purple lighten-5">
        <img src="/images/logo/circle_logo_500.png" alt="Vuetify.js" class="mt-3 mb-5" />
        <h3>Avancer ensemble</h3>
      </header>
      <section class="description deep-purple lighten-4">
        <div class="yellow lighten-5">
          <h3>Faites vivre vos projets</h3>
          <v-divider class="purple darken-5" />
          <p>
            Sur Ideka, vous pouvez référencer vos projets, et accéder à différents outils permettant d'informer, de recruter et de gérer au mieux votre projet.
            Bénéficiez de la visibilité de la plateforme pour faire connaître votre projet, et bénéficier de l'aide de la communauté de New Talents.
            Quel que soit le niveau d'avancement où vous vous situez, les services d'Ideka vous aideront à progresser vers l'étape suivante !
          </p>
        </div>
        <div class="yellow lighten-5">
          <h3>Cultivez vos compétences</h3>
          <v-divider class="purple darken-5" />
          <p>
            Proposez-vous pour aider l'un des projets référencés sur Ideka pour parfaire vos compétences !
            Repérez les projets qui recrutent des profils bénévoles comme le vôtre, et valorisez ensuite votre participation.
            A terme, si vous le souhaitez, constituez un véritable CV virtuel basé sur vos expériences Ideka, pour mettre en valeur vos savoirs-faire devant de futurs employeurs !
          </p>
        </div>
      </section>
      <section class="news">
        <header>
          <h2>Dernières actualités</h2>
        </header>
        <div>
          <project-news-card v-for="n in news" :key="n.id" :project="n.project" :news="n" />
        </div>
      </section>
      <section class="projects">
        <project-panorama :projects="projects" />
      </section>
  </v-layout>
</template>

<script>
import ProjectPanorama from '~/components/organisms/project/panorama';
import ProjectNewsCard from '~/components/molecules/project/news-card';

export default {
  name: 'page-home',

  async asyncData ({ app }) {
    return {
      projects: await app.$repositories.project.project.getAll(),
      news: await app.$repositories.project.news.getLastNews()
    }
  },

  components: {
    ProjectPanorama,
    ProjectNewsCard
  }
}
</script>

<style lang="less" scoped>
  @import '~less/variables.less';

  .landing {
    padding-top: 50px;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > img {
      width: 300px;
    }

    & > h3 {
      font-size: 2.0em;
      text-align: center;
      color: @bossanova;
    }
  }

  .description {
    display: flex;
    justify-content: space-around;
    align-items: flex-center;
    padding-top: 50px;
    padding-bottom: 40px;

    & > div {
      flex-basis: 35%;
      padding: 10px 20px;
      border-radius: 5px;
      box-shadow: 0px 2px 5px rgba(0,0,0,0.6);

      & > h3 {
        text-align: center;
        font-size: 1.8em;
        color: @bossanova;
        margin-bottom: 10px;
      }

      & > p {
        margin-top: 10px;
        text-align: justify;
        font-size: 1.1em;
      }
    }
  }

  .news {
    & > header {
      margin: 20px 0px;
      & > h2 {
        text-align: center;
      }
    }

    & > div {
      display: flex;
      justify-content: center;

      & > .project-news-card {
        margin: 10px;
        flex-basis: 33%;
      }
    }
  }
</style>
