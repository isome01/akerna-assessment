import ajax from '../../../config/ajax'

const getBeverageData = () => ajax.get('/drinks/list')
  .then(res => res.data.data || [])

export {
  getBeverageData
}
