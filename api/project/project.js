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
}
