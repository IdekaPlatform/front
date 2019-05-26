import Repository from '~/api/repository';

export default class OrganizationRepository extends Repository {
    get(slug) {
        return this.call('GET', `api/organizations/${slug}`);
    }

    getUserOrganizations(user) {
        return this.call('GET', `api/users/${user.id}/organizations`);
    }
}