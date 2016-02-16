/**
 * Types
 */

const FETCH = 'EFFECT_FETCH'

/**
 * Credential middleware
 */

function query (pattern, name, getToken) {
  return ({getState}) => next => action =>
    action.type === FETCH && pattern.test(action.payload.url)
      ? next({...action, payload: {...action.payload, url: decorate(getState(), action.payload.url)}})
      : next(action)

  function decorate (state, url) {
    const token = getToken(state)
    if (!token) return url

    const [base, qs = ''] = url.split('?')
    const param = [name, token].map(encodeURIComponent).join('=')

    return [
      base,
      qs.split('&').concat(param).filter(Boolean).join('&')
    ].join('?')
  }
}

function bearer (pattern, getToken, prefix = 'Bearer') {
  return ({getState}) => next => action =>
    action.type === FETCH && pattern.test(action.payload.url)
      ? next({...action, payload: {...action.payload, params: {...action.payload.params, headers: decorate(getState(), (action.payload.params || {}).headers)}}})
      : next(action)

  function decorate (state, headers = {}) {
    const token = getToken(state)
    if (!token) return headers

    return {
      ...headers,
      Authorization: prefix + ' ' + token
    }
  }
}

/**
 * Exports
 */

export {
  query,
  bearer
}
