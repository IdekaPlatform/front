import Repository from '~/api/repository'

export default class JobOfferRepository extends Repository {
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
}
