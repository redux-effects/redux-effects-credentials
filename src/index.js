/**
 * Imports
 */

import {FETCH} from 'redux-effects-fetch'

/**
 * Credential middleware
 */

function query (pattern, name, getToken) {
  return abstractMw(pattern, getToken, (payload, token) => ({
    ...payload,
    url: decorate(payload.url, token)
  }))

  function decorate (url, token) {
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
  return abstractMw(pattern, getToken, (payload, token) => !token ? payload : ({
    ...payload,
    params: {
      ...(payload.params || {}),
      headers: {
        ...((payload.params || {}).headers || {}),
        Authorization: prefix + ' ' + token
      }
    }
  }))
}

function abstractMw (pattern, getToken, xf) {
  const isMatch = matcher(pattern)
  return ctx => next => action => action.type === FETCH && isMatch(action.payload.url)
    ? next({...action, payload: xf(action.payload, getToken(ctx))})
    : next(action)
}

function matcher (pattern) {
  return typeof pattern === 'function'
    ? pattern
    : url => pattern.test(url)
}

/**
 * Exports
 */

export {
  query,
  bearer
}
