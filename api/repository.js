const fetch = (typeof process.env.TESTING === 'undefined') ? require('node-fetch') : require('jest-fetch-mock')

global.FormData = (process.server) ? class FormData{} : window.FormData;

export default class Repository {
    constructor(store) {
        this.store = store;
        this.reperformCall = false;
    }

    sendFile(method, url, picture) {
        return new Promise(async (resolve, reject) => {
            const headers = Object.assign({}, this.store.getters['api/headers']);
            delete headers['Content-Type'];

            const form = new FormData();
            form.append('file', picture);

            const response = await fetch(`${this.store.getters['api/url']}/${url}`, {
                method: method,
                body: form,
                headers: headers
            });
            try {
                resolve(this.processResponse(response));
            } catch(e) {
                reject(e);
            }
        });
    }

    call(method, url, body, extraHeaders) {
        return new Promise(async (resolve, reject) => {
            const headers = this.store.getters['api/headers'];

            const response = await fetch(`${this.store.getters['api/url']}/${url}`, {
                method: method,
                body: (typeof body !== 'undefined' && body !== null) ? JSON.stringify(body) : null,
                headers: (typeof extraHeaders === 'undefined') ? headers : Object.assign({}, headers, extraHeaders)
            });
            try {
                const result = await this.processResponse(response);

                resolve((this.reperformCall === true) ? this.call(method, url, body, extraHeaders) : result);
            } catch(e) {
                reject(e);
            }
        });
    }

    async processResponse(response) {
        this.reperformCall = false;
        if (response.ok) {
            if (response.status === 204) {
                return;
            }
            return response.json();
        } else if (response.status === 401) {
            const isRefreshed = await this.refreshToken();
            if (isRefreshed) {
                this.reperformCall = true;
                return;
            }
            await this.store.dispatch('user/logout');

            throw {
                code: 401,
                message: 'unauthorized'
            };
        } else {
            const data = await response.json();
            
            throw {
                code: response.status,
                message: data.error
            };
        }
    }

    async refreshToken() {
        try {
            const refreshToken = this.store.state.user.refreshToken;
            if (!refreshToken) {
                return false;
            }
            const response = await fetch(`${this.store.getters['api/url']}/api/token/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh_token: refreshToken })
            });
            const data = await response.json();
            await this.store.dispatch('user/storeToken', { token: data.token, refresh_token: refreshToken });
        } catch (err) {
            return false;
        }
        return true;
    }
};