import ProjectRepository from '~/api/project/project'
import UserRepository from '~/api/user';
import OrganizationRepository from '~/api/organization';
import SkillRepository from '~/api/skill';
import JobOfferRepository from '~/api/project/job_offer';
import CandidatureRepository from '~/api/project/candidature';
import NewsRepository from '~/api/project/news';

export default ({ store }, inject) => {
  inject('repositories', {
    organization: new OrganizationRepository(store),
    project: {
      project: new ProjectRepository(store),
      job_offer: new JobOfferRepository(store),
      candidature: new CandidatureRepository(store),
      news: new NewsRepository(store),
    },
    user: new UserRepository(store),
    skill: new SkillRepository(store),
  })
}
