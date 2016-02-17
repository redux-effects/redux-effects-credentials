/**
 * Imports
 */

import {FETCH} from 'redux-effects-fetch'

/**
 * Credential middleware
 */

function query (pattern, name, getToken) {
  const isMatch = matcher(pattern)

  return ({getState}) => next => action =>
    action.type === FETCH && isMatch(action.payload.url)
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
  const isMatch = matcher(pattern)

  return ({getState}) => next => action =>
    action.type === FETCH && isMatch(action.payload.url)
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
