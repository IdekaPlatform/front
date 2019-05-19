import ProjectRepository from '~/api/project'

export default ({ store }, inject) => {
  inject('repositories', {
    project: new ProjectRepository(store)
  })
}
