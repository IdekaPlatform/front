import ProjectRepository from '~/api/project'
import UserRepository from '~/api/user';
import OrganizationRepository from '~/api/organization';

export default ({ store }, inject) => {
  inject('repositories', {
    organization: new OrganizationRepository(store),
    project: new ProjectRepository(store),
    user: new UserRepository(store)
  })
}
