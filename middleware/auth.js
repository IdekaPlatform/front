const cookie = process.server ? require('cookie') : undefined;

const authenticate = async (app, store, req) => {
    try {
        const cookies = cookie.parse(req.headers.cookie);
        const token = cookies.security_token;
        const refreshToken = cookies.security_refresh_token;
        if (token) {
            await store.dispatch('user/storeToken', { token, refresh_token: refreshToken });
            store.commit('user/setUser', await app.$repositories.user.getMyInfos());
            const [ organizations, projects ] = await Promise.all([
                app.$repositories.organization.getUserOrganizations(store.getters['user/user']),
                app.$repositories.project.getUserProjects(store.getters['user/user'])
            ]);
            store.commit('user/setOrganizations', organizations)
            store.commit('user/setProjects', projects)
        }
    } catch (error) {
        console.log(error);
        await store.dispatch('user/logout');
    }
};

export default async function({ app, req, store, redirect }) {
    // If a cookie is present, we try to auth the user with it
    if (req && req.headers.cookie) {
        await authenticate(app, store, req);
    }
    // if (store.state.user.user === null) {
    //     redirect('/signin');
    // }
};