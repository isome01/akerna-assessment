import ajax from '../../../config/ajax'

const getUserSpecs = () => ajax.get('/specs')
  .then(res => res.data || {})

const updateUserSpecs = specs => ajax.post('/specs', {payload: specs})
  .then(res => res.data || {})

const refreshUserSpecs = id => ajax.post('/specs/refresh', {payload: id})
  .then(res => res.data || {})

export {
  getUserSpecs,
  updateUserSpecs,
  refreshUserSpecs
}
