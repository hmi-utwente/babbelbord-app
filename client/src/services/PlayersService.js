/**
 * Created by ale on 09/12/2017.
 */

import Api from '@/services/Api'

export default {
  getPlayers () {
    return Api().get('/api/players')
  },
  getPlayer (id) {
    return Api().post('/api/player/', id)
  },
  register (credentials){
    return Api().post('/api/players/create', credentials)
  }
}
