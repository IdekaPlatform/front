import Repository from '~/api/repository'

export default class NewsRepository extends Repository {
  createNews(project, title, content) {
    return this.call('POST', `api/projects/${project.slug}/news`, { title, content });
  }

  updateNews(project, id, title, content) {
    return this.call('PUT', `api/projects/${project.slug}/news/${id}`, { title, content });
  }

  getProjectNews(project) {
    return this.call('GET', `api/projects/${project.slug}/news`);
  }

  getNews(projectSlug, id) {
    return this.call('GET', `api/projects/${projectSlug}/news/${id}`);
  }

  publishNews(news) {
    return this.call('PATCH', `api/projects/${news.project.slug}/news/${news.id}/publish`);
  }

  unpublishNews(news) {
    return this.call('PATCH', `api/projects/${news.project.slug}/news/${news.id}/unpublish`);
  }
}
