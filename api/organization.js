import Repository from '~/api/repository';

export default class OrganizationRepository extends Repository {
    get(slug) {
        return this.call('GET', `api/organizations/${slug}`);
    }

    getUserOrganizations(user) {
        return this.call('GET', `api/users/${user.id}/organizations`);
    }

    create(name, shortDescription, description, websiteUrl) {
        return this.call('POST', 'api/organizations', {
            name,
            short_description: shortDescription,
            description,
            website_url: websiteUrl
        });
    }
}