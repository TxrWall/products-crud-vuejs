import { http } from './config'

export default {

  list:() => {
    return http.get('products')
  },

  save: (product) => {
    return http.post('products', product)
  },
  
  update: (product) => {
    return http.put('products/' + product.id, product)
  },

  remove: (product) => {
    return http.delete('products/' + product.id)
  }

}