import Repository from '~/api/repository'

export default class ProjectRepository extends Repository {
  get (slug) {
    return this.call('GET', `api/projects/${slug}`)
  }

  getAll () {
    return this.call('GET', 'api/projects')
  }

  getOrganizationProjects(organization) {
    return this.call('GET', `api/organizations/${organization.slug}/projects`);
  }

  getUserProjects(user) {
    return this.call('GET', `api/users/${user.id}/projects`)
  }

  create(data) {
    return this.call('POST', 'api/projects', this.getBody(data));
  }

  update(project, data) {
    return this.call('PUT', `api/projects/${project.slug}`, this.getBody(data));
  }

  getBody(data) {
    const body = {
      name: data.name,
      short_description: data.shortDescription,
      description: data.description,
      website_url: data.websiteUrl
    };
    if (data.organization !== null) {
      body.organization_slug = data.organization.slug;
    }
    return body;
  }

  createJobOffer(project, title, content) {
    return this.call('POST', `api/projects/${project.slug}/job-offers`, { title, content });
  }

  getProjectJobOffers(project) {
    return this.call('GET', `api/projects/${project.slug}/job-offers`);
  }

  getJobOffer(project, id) {
    return this.call('GET', `api/projects/${project.slug}/job-offers/${id}`);
  }

  updateJobOfferSkillLevel(jobOffer, skill) {
    return this.call('PATCH', `api/projects/${jobOffer.project.slug}/job-offers/${jobOffer.id}/skills/${skill.skill.id}`, { level: skill.level });
  }

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

  createCandidature(jobOffer) {
    return this.call('POST', `api/projects/${jobOffer.project.slug}/job-offers/${jobOffer.id}/candidatures`, {
      message: ''
    })
  }

  getCandidatures(jobOffer) {
    return this.call('GET', `api/projects/${jobOffer.project.slug}/job-offers/${jobOffer.id}/candidatures`)
  }

  acceptCandidature(candidature) {
    return this.call('POST', `api/projects/${candidature.job_offer.project.slug}/job-offers/${candidature.job_offer.id}/candidatures/${candidature.id}/accept`);
  }

  declineCandidature(candidature) {
    return this.call('POST', `api/projects/${candidature.job_offer.project.slug}/job-offers/${candidature.job_offer.id}/candidatures/${candidature.id}/decline`);
  }
}
