import Repository from '~/api/repository'

export default class ProjectRepository extends Repository {
  get (slug) {
    return this.call('GET', `api/projects/${slug}`)
  }

  getAll () {
    return this.call('GET', 'api/projects')
  }

  getUserProjects(user) {
    return this.call('GET', `api/users/${user.id}/projects`)
  }

  create(name, organizationId, shortDescription, description, websiteUrl) {
    const body = {
      name,
      short_description: shortDescription,
      description,
      website_url: websiteUrl
    };
    if (organizationId !== null) {
      body.organization_id = organizationId
    }
    return this.call('POST', 'api/projects', body)
  }
}
