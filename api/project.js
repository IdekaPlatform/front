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
}
