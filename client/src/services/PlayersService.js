/**
 * Created by ale on 09/12/2017.
 */

import Api from '@/services/Api'

export default {
  getPlayers () {
    return Api().get('/api/players')
  },
  getPlayer (playerId) {
    return Api().get('/api/player/' + playerId)
  },
  update (player){
    return Api().post('/api/player/update', player)
  },
  register (credentials){
    return Api().post('/api/players/create', credentials)
  },
}
