import Repository from '~/api/repository'

export default class CandidatureRepository extends Repository {
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
