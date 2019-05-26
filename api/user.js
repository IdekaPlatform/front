import Repository from '~/api/repository';

export default class UserRepository extends Repository {
    getMyInfos() {
        return this.call('GET', 'api/me');
    }

    create(username, email, password) {
        return this.call('POST', 'api/users', { username, email, password });
    }

    login(username, password) {
        return this.call('POST', 'api/login_check', { username, password });
    }
}