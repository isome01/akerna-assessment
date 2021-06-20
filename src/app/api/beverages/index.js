import ajax from '../../../config/ajax'

const getBeverageData = () => ajax.get('/drinks/list')
  .then(res => res.data.data || [])

const updateUserFavorites = favorites => {
  ajax.post('/specs/favorites', favorites)
    .then(res => res || 'Error.')
}

export {
  getBeverageData
}
