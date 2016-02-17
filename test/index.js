/**
 * Imports
 */

import test from 'tape'
import {fetch} from 'redux-effects-fetch'
import {bearer, query} from '../src'

/**
 * Tests
 */

test('query', ({equal, plan}) => {
  const qs = query(/.*/, 'access_token', state => state.token)({getState: () => ({token: 'someToken'})})
  const mw = qs(effect => {
    equal(effect.payload.url, 'http://test/?access_token=someToken')
  })

  plan(2)
  mw(fetch('http://test/'))
  mw(fetch('http://test/?'))
})

test('bearer', ({equal, plan}) => {
  const b = bearer(/.*/, state => state.token)({getState: () => ({token: 'someToken'})})
  const mw = b(effect => {
    equal(effect.payload.params.headers.Authorization, 'Bearer someToken')
  })

  plan(1)
  mw(fetch('http://test/'))
})
