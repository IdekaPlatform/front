import Repository from '~/api/repository';

export default class SkillRepository extends Repository {
    async getAll() {
        const skills = await this.call('GET', 'api/skills');
        const result = {};
        for (const skill of skills) {
            if (typeof result[skill.type] === 'undefined') {
                result[skill.type] = [];
            }
            result[skill.type].push(skill);
        }
        return result;
    }

    create(jobOffer, skillId, level) {
        return this.call('POST', `api/projects/${jobOffer.project.slug}/job-offers/${jobOffer.id}/skills`, {
            skill_id: skillId,
            level
        });
    }
};