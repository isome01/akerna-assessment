import ajax from '../../../config/ajax'

const getUserSpecs = () => ajax.get('/specs')
  .then(res => res.data.data)

export {
  getUserSpecs
}
