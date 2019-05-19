const fetch = (typeof process.env.TESTING === 'undefined') ? require('node-fetch') : require('jest-fetch-mock')

global.FormData = (process.server) ? class FormData {} : window.FormData

export default class Repository {
  constructor (store) {
    this.store = store
  }

  sendFile (method, url, picture) {
    return new Promise(async (resolve, reject) => {
      const headers = Object.assign({}, this.store.getters['api/headers'])
      delete headers['Content-Type']

      const form = new FormData()
      form.append('file', picture)

      const response = await fetch(`${this.store.getters['api/url']}/${url}`, {
        method: method,
        body: form,
        headers: headers
      })
      try {
        resolve(this.processResponse(response))
      } catch (e) {
        reject(e)
      }
    })
  }

  call (method, url, body, extraHeaders) {
    return new Promise(async (resolve, reject) => {
      const headers = this.store.getters['api/headers']

      const response = await fetch(`${this.store.getters['api/url']}/${url}`, {
        method: method,
        body: (typeof body !== 'undefined' && body !== null) ? JSON.stringify(body) : null,
        headers: (typeof extraHeaders === 'undefined') ? headers : Object.assign({}, headers, extraHeaders)
      })
      try {
        resolve(this.processResponse(response))
      } catch (e) {
        reject(e)
      }
    })
  }

  async processResponse (response) {
    if (response.ok) {
      if (response.status === 204) {
        return
      }
      return response.json()
    } else if (response.status === 401) {
      await this.store.dispatch('user/logout')

      throw new Error('unauthorized')
    } else {
      const data = await response.json()

      throw data.error
    }
  }
}
