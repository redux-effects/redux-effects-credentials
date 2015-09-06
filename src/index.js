/**
 * Imports
 */

/**
 * Credential middleware
 */

function query (pattern, name, getToken) {
  return ({getState}) => next => effect =>
    effect.type === 'FETCH' && pattern.test(effect.url)
      ? next({...effect, url: decorate(getState(), effect.url)})
      : next(effect)

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

function bearer (pattern, getToken) {
  return ({getState}) => next => effect =>
    effect.type === 'FETCH' && pattern.test(effect.url)
      ? next({...effect, params: {...effect.params, headers: decorate(getState(), (effect.params || {}).headers)}})
      : next(effect)

  function decorate (state, headers = {}) {
    const token = getToken(state)
    if (!token) return headers

    return {
      ...headers,
      Authorization: 'Bearer ' + token
    }
  }
}

/**
 * Exports
 */

export default {
  query,
  bearer
}
