<template>
    <v-card :color="(!news.is_published) ? 'teal lighten-5' : null" class="project-news-card">
        <v-alert v-if="!news.is_published" :value="true" icon="info" color="teal" outlined>
          Cette nouvelle n'est pas publiée et n'est visible que par votre équipe
        </v-alert>
        <v-card-title>
          <h3 class="headline mb-0">{{ news.title }}</h3>
        </v-card-title>
        <v-card-text class="content" v-html="news.content"></v-card-text>
        <v-card-text>
            <span class="grey--text right">par {{ news.author.username }} le {{ (new Date(news.updated_at)).toLocaleDateString('fr-FR', { minute: 'numeric', hour: 'numeric' }) }}</span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="teal" text :to="`/projects/${project.slug}/news/${news.id}-${news.slug}`">Lire</v-btn>
          <template v-if="isProjectMember">
            <v-btn color="teal" text :to="`/projects/${project.slug}/news/${news.id}-${news.slug}/edit`">Modifier</v-btn>
            <v-btn v-if="!news.is_published" color="teal" text @click="publish()">Publier</v-btn>
            <v-btn v-else color="teal" text @click="unpublish()">Dépublier</v-btn>
          </template>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'project-news-card',

    props: ['project', 'news'],

    computed: {
        ...mapGetters({
            user: 'user/user'
        }),

        isProjectMember() {
            if (this.user === null) {
                return false
            }
            for (const project of this.user.projects) {
                if (this.project.id === project.id) {
                return true
                }
            }
            return false
        }
    },

  methods: {
    async publish() {
      await this.$repositories.project.news.publishNews(this.news)

      this.news.is_published = true
    },

    async unpublish() {
      await this.$repositories.project.news.unpublishNews(this.news)

      this.news.is_published = false
    }
  }
}
</script>

<style lang="less" scoped>
  .news-card {
    max-width: 300px;
  }
</style>
