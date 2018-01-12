/**
 * Created by ale on 09/12/2017.
 */

import Api from '@/services/Api'

export default {
  getCategories() {
    return Api().get('/api/categories')
  }
}
