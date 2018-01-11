import Vue from 'vue'
import Vuex from 'vuex'

import PlayersService from '@/services/PlayersService'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    players: [],
    topics: [],
    categories: [],
    questions: [],
    player: {},
    caregiver: {}
  },
  getters: {
    // functions to get modified data from the store
    getPlayerById: (state) => (id) => {
      for(var i=0; i < state.players.length; i++){
        if(state.players[i].id == id){
          return state.players[i]
        }
      }
    }
  },
  mutations: {
    // functions to modify data on the store
    initializePlayers: (state, players) => {
      state.players = players.data;
      console.log('Players set!')
    },
    initializeTopics: (state, topics) => {
      state.topics = topics.data;
    },
    initializeQuestions: (state, questions) => {
        state.questions = questions.data;
    },
    setPlayerAndCaregiver: (state, {player, caregiver}) => {
      console.log('Caregiver: ', caregiver)
      state.player = player
      state.caregiver = caregiver
    }
  },
  actions: {
    async retrievePlayers(context) {
      try {
        const players = await PlayersService.getPlayers()
        context.commit('initializePlayers', players)
      } catch (error) {
        console.log('Error in getting updated players')
      }
    },
  }
})
