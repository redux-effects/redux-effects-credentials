/**
 * Imports
 */

import test from 'tape'
import {bearer, query} from '../src'

/**
 * Tests
 */

test('query', ({equal, plan}) => {
  const qs = query(/.*/, 'access_token', state => state.token)({getState: () => ({token: 'someToken'})})
  const mw = qs(effect => {
    equal(effect.url, 'http://test/?access_token=someToken')
  })

  plan(2)
  mw({type: 'FETCH', url: 'http://test/'})
  mw({type: 'FETCH', url: 'http://test/?'})
})

test('bearer', ({equal, plan}) => {
  const b = bearer(/.*/, state => state.token)({getState: () => ({token: 'someToken'})})
  const mw = b(effect => {
    equal(effect.params.headers.Authorization, 'Bearer someToken')
  })

  plan(1)
  mw({type: 'FETCH', url: 'http://test/'})
})
