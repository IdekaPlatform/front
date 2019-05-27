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

  create(name, organizationSlug, shortDescription, description, websiteUrl) {
    const body = {
      name,
      short_description: shortDescription,
      description,
      website_url: websiteUrl
    };
    if (organizationSlug !== null) {
      body.organization_slug = organizationSlug
    }
    return this.call('POST', 'api/projects', body)
  }
}
