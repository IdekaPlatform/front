export const state = () => ({
    notifications: []
});

export const mutations = {
    add(state, notif) {
        state.notifications.push(notif);
    },

    remove(state, notif) {
        state.notifications.splice(state.notifications.indexOf(notif), 1)
    }
};

export const actions = {
    add({ commit }, notif) {
        commit('add', notif);
        setTimeout(() => {
            commit('remove', notif);
        }, 5000);
    }
};